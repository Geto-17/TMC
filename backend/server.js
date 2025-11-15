// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const Student = require("./models/Student");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logger for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for avatar uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (/^image\//.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 3 * 1024 * 1024 } });

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/tmc_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { studentId, firstName, middleName, lastName, course, block, password, gender } = req.body;

    if (!studentId || !firstName || !lastName || !course || !block || !password) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const existing = await Student.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ message: "Student ID already exists." });
    }

    const newStudent = new Student({ studentId, firstName, middleName, lastName, course, block, password, gender });
    await newStudent.save();

    res.status(201).json({ message: "Registration successful", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { studentId, password } = req.body;

    const student = await Student.findOne({ studentId, password });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", student });
  } catch (error) {
    res.status(500).json({ message: "Server error during login", error });
  }
});

// Update profile
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
  const allowedFields = ["firstName", "middleName", "lastName", "course", "block", "avatar", "gender"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const updated = await Student.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: "Student not found" });

    const out = updated.toObject();
    delete out.password;
    res.json({ message: "Profile updated", student: out });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error during update", error: err.message });
  }
});

// Health check / ping route for quick connectivity tests from devices
app.get("/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Upload avatar endpoint (multipart/form-data)
app.post('/upload-avatar/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Build public URL for the uploaded file
    const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const updated = await Student.findByIdAndUpdate(id, { avatar: avatarUrl }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Student not found' });

    const out = updated.toObject();
    delete out.password;
    res.json({ message: 'Avatar uploaded', student: out });
  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ message: 'Server error during avatar upload', error: err.message });
  }
});

// Generic error handler (returns JSON) to avoid sending HTML error pages to the client
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

// Start Server
const PORT = 3000;
// bind to 0.0.0.0 so devices on the LAN can reach this dev server
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on http://localhost:${PORT}`));
