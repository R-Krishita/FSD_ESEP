require('dotenv').config();
const express = require('express');
const cors = require('cors'); // moved below express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors()); // should come AFTER express is initialized
app.use(bodyParser.json());
// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define Attendance schema and model
const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent'], required: true }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Route to mark attendance
app.post('/mark-attendance', async (req, res) => {
  console.log('Received request body:', req.body); // <-- Debug log

  const { studentId, status } = req.body;

  if (!studentId || !status) {
    return res.status(400).json({ error: 'Student ID and status are required' });
  }

  const newAttendance = new Attendance({
    studentId,
    status
  });

  try {
    await newAttendance.save();
    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error saving attendance:', error); // <-- Log specific error
    res.status(500).json({ error: 'Error marking attendance' });
  }
});

// Route to fetch attendance records by student ID
app.get('/attendance/:studentId', async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const records = await Attendance.find({ studentId });
    if (records.length === 0) {
      return res.status(404).json({ message: 'No records found for this student' });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records:', error); // <-- Log specific error
    res.status(500).json({ error: 'Error retrieving attendance records' });
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
