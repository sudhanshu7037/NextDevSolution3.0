const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // Icon class or image URL
  details: [String], // Bullet points
  category: { type: String }, // e.g., 'Development', 'Branding'
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
