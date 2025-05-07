
// 📁 client/src/pages/Manager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Manager = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings/manager', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setBookings(res.data));
  }, [token]);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/bookings/${id}/${status}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
  };

  return (
    <div className="p-6">
      <h1 className="text-6xl font-bold mb-4">
        Manager Dashboard
      </h1>
      <h2 className="text-2xl font-bold mb-4">Weekly Bookings</h2>
      <table className="w-full table-auto">
        <thead>
          <tr><th>User</th><th>Room</th><th>Start</th><th>End</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="text-center border-t">
              <td>{b.userId.name}</td>
              <td>{b.roomId.roomNumber}</td>
              <td>{new Date(b.startDate).toDateString()}</td>
              <td>{new Date(b.endDate).toDateString()}</td>
              <td>{b.status}</td>
              <td>
                <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded" onClick={() => updateStatus(b._id, 'confirmed')}>Confirm</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => updateStatus(b._id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manager;
