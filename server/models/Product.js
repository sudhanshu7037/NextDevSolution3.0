const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
