// ✅ Room routes update - 📁 server/routes/rooms.js
const express = require('express');
const Room = require('../models/Room');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

// Get all rooms
router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

// Add a new room (manager only)
// router.post('/', authenticate, requireRole('manager'), async (req, res) => {
router.post('/', async (req, res) => {
  const { roomNumber, type, pricePerNight, isAvailable } = req.body;
  const room = new Room({ roomNumber, type, pricePerNight, isAvailable });
  await room.save();
  res.status(201).json(room);
});

module.exports = router;