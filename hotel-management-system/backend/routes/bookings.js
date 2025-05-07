// ✅ Bookings Backend - 📁 server/routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { authenticate, requireRole } = require('../middleware/auth');
const router = express.Router();

// User books a room
router.post('/', authenticate, async (req, res) => {
  const { roomId, startDate, endDate } = req.body;

  const booking = new Booking({
    userId: req.user.id,
    roomId,
    startDate,
    endDate,
    status: 'pending',
  });
  await booking.save();
  res.status(201).json(booking);
});

// Get current user's bookings
router.get('/user', authenticate, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('roomId');
  res.json(bookings);
});

// Get all bookings for manager's weekly view
router.get('/manager', authenticate, requireRole('manager'), async (req, res) => {
  const oneWeekAhead = new Date();
  oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);
  const bookings = await Booking.find({
    // startDate: { $lte: oneWeekAhead },
  }).populate('userId roomId');
  res.json(bookings);
});

// Confirm or reject booking (manager only)
router.put('/:id/:action', authenticate, requireRole('manager'), async (req, res) => {
  const { id, action } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) return res.status(404).json({ msg: 'Booking not found' });
  booking.status = action;
  await booking.save();
  res.json({ msg: `Booking ${action}` });
});

module.exports = router;