
// 📁 client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');
  const bookRoom = async (roomId) => {
    const startDate = prompt('Enter start date (YYYY-MM-DD)');
    const endDate = prompt('Enter end date (YYYY-MM-DD)');
    if (!startDate || !endDate) return;
    try {
      await axios.post('http://localhost:5000/api/bookings', { roomId, startDate, endDate }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Booking requested. Await confirmation.');
    } catch (err) {
      alert('Booking failed' + err.message);
    }
  };
  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRooms(res.data));
    axios.get('http://localhost:5000/api/bookings/user', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setBookings(res.data));
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">Room {room.roomNumber} - {room.type}</h3>
            <p>Price: ${room.pricePerNight}</p>
            <button onClick={() => bookRoom(room._id)} className="bg-blue-500 text-white px-2 py-1 mt-2 rounded hover:bg-blue-600">
              Book Room
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">My Bookings</h2>
      <table className="w-full table-auto">
        <thead>
          <tr><th>Room</th><th>Start</th><th>End</th><th>Status</th></tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id} className="text-center border-t">
              <td>{booking.roomId.roomNumber}</td>
              <td>{new Date(booking.startDate).toDateString()}</td>
              <td>{new Date(booking.endDate).toDateString()}</td>
              <td>{booking.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;