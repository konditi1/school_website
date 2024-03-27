const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true, unique: true },
  admissionNumber: { type: String, required: true, unique: true },
  faculty: { type: String, required: true },
  year: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
