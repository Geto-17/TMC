// backend/models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  course: { type: String, required: true },
  block: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String }, // ← Add this
  gender: { type: String }, // ← Add this
});

module.exports = mongoose.model("Student", studentSchema);
