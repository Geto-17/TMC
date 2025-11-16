const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  course: { type: String, required: true },
    block: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: false },
    password: { type: String, required: true }, // hash passwords in production
    avatar: { type: String }, // URL path to uploaded avatar image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
