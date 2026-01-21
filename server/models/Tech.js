const mongoose = require('mongoose');

const techSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String }, // Image path
  category: { type: String }, // e.g., 'Frontend', 'Backend'
}, { timestamps: true });

module.exports = mongoose.model('Tech', techSchema);
