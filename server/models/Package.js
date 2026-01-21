const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  description: { type: String },
  features: [String],
  isPopular: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
