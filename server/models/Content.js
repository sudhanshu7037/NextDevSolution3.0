const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    default: 'home'
  },
  section: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });

// Ensure unique section per page
contentSchema.index({ page: 1, section: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);
