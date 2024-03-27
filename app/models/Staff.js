const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffNumber: { type: String, required: true },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
