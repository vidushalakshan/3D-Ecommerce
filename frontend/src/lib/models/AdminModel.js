const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // hashed password (bcrypt)
    required: true,
  },
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);