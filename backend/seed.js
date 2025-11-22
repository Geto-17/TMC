// Simple seed script to insert a test Student document for manual testing.
// Usage:
//   export MONGODB_URI='mongodb+srv://user:pass@cluster.../tmc_db?retryWrites=true&w=majority'
//   node backend/seed.js

const mongoose = require('mongoose');
const Student = require('./models/Student');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tmc_db';
  console.log('Connecting to', uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@'));
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  const sample = {
    studentId: 'SAMPLE001',
    firstName: 'Demo',
    middleName: 'Seed',
    lastName: 'Student',
    course: 'IT',
    block: 'A',
    gender: 'Male',
    password: 'password',
    avatar: '',
  };

  try {
    const existing = await Student.findOne({ studentId: sample.studentId });
    if (existing) {
      console.log('Sample student already exists:', existing.studentId);
    } else {
      const created = await Student.create(sample);
      console.log('Created sample student:', created.studentId, created._id);
    }
  } catch (err) {
    console.error('Seed error:', err.message || err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run().catch(err => {
  console.error('Unhandled seed error:', err);
  process.exit(1);
});
