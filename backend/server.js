// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const os = require("os");
const Student = require("./models/Student");

const app = express();

// Middleware
app.use(cors());
// Increase JSON and URL-encoded body size limits to allow reasonably-sized data URIs from dev clients
// Note: images should generally be uploaded via multipart/form-data (see /upload-avatar), but we increase limits for dev convenience.
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

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

// Allow larger avatar files (15 MB) during development — adjust for production as needed.
const upload = multer({ storage, fileFilter, limits: { fileSize: 15 * 1024 * 1024 } });

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/tmc_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

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

    // Build public URL using the server's actual listening address (0.0.0.0:3000)
    // Use localhost for dev, or replace with your machine's LAN IP if accessing from phone
    const host = '10.152.41.129'; // ⚠️ Change this to your machine's IP or use dynamic detection
    const avatarUrl = `http://${host}:3000/uploads/${req.file.filename}`;

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

// Helper function to get network IPs
function getNetworkIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  
  return ips;
}

// Start Server
const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  const networkIPs = getNetworkIPs();
  
  console.log("\n" + "=".repeat(60));
  console.log("🚀 SERVER IS RUNNING!");
  console.log("=".repeat(60));
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Host: ${HOST} (listening on all network interfaces)`);
  console.log("\n📱 USE THESE URLs IN YOUR FRONTEND:\n");
  
  if (networkIPs.length > 0) {
    networkIPs.forEach((ip, index) => {
      console.log(`   ${index + 1}. http://${ip}:${PORT}`);
    });
    console.log("\n✨ Copy one of the above URLs to your LoginScreen.js");
    console.log("   Example: const API_BASE = \"http://" + networkIPs[0] + ":" + PORT + "\";");
  } else {
    console.log("   ⚠️  No network interfaces found!");
    console.log("   Make sure you're connected to WiFi or Hotspot");
  }
  
  console.log("\n🧪 TEST FROM PHONE BROWSER:");
  if (networkIPs.length > 0) {
    console.log(`   Open: http://${networkIPs[0]}:${PORT}/ping`);
  }
  console.log("=".repeat(60) + "\n");
});