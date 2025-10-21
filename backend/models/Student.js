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
});

module.exports = mongoose.model("Student", studentSchema);
