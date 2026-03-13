const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  isAiGenerated: {
    type: Boolean,
    default: false
  },
  aiProbability: {
    type: Number,
    default: 0
  },
  detectedObject: {
    type: String,
    enum: ['plastic', 'dead_animal', 'none'],
    default: 'none'
  },
  wasteLevel: {
    type: Number,
    enum: [1, 2, 3],
    default: 1
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New'
  }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
