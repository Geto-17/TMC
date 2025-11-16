// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/tmc_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { studentId, firstName, middleName, lastName, course, block, password } = req.body;

    if (!studentId || !firstName || !lastName || !course || !block || !password) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const existing = await Student.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ message: "Student ID already exists." });
    }

    const newStudent = new Student({ studentId, firstName, middleName, lastName, course, block, password });
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

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
