
// ✅ Frontend - 📁 client/src/pages/AddRoom.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/rooms',
        { roomNumber, type, pricePerNight: price, isAvailable },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Room added successfully');
      setRoomNumber('');
      setType('');
      setPrice('');
      setIsAvailable(true);
    } catch (err) {
      alert('Error adding room');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center font-bold">Add Room</h2>
        <input type="text" placeholder="Room Number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded" required />
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded" required />
        <input type="number" placeholder="Price Per Night" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded" required />
        <label className="flex items-center mb-4">
          <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="mr-2" /> Available
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;