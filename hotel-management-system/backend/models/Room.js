const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  type: String,
  pricePerNight: Number,
  isAvailable: Boolean
});

module.exports = mongoose.model('Room', roomSchema);
