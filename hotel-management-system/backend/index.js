const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const roomRoutes = require('./routes/rooms');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://sahas17383:sahas0504@cluster0.rkoogkc.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("MongoDB is Connected");
});

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
