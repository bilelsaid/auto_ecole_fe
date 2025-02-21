// src/components/AvailabilityManager.js
import React, { useState, useEffect } from 'react';
import api from '../api';

function AvailabilityManager() {
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    api.get('/availabilities')
      .then(response => {
         setAvailabilities(response.data);
      })
      .catch(error => {
         console.error("Error fetching availabilities", error);
      });
  }, []);

  const handleChange = e => {
    setNewAvailability({...newAvailability, [e.target.name]: e.target.value});
  };

  const handleAddAvailability = e => {
    e.preventDefault();
    api.post('/availabilities', newAvailability)
      .then(response => {
        alert('Availability added');
        setAvailabilities([...availabilities, response.data]);
        setNewAvailability({ date: '', startTime: '', endTime: '' });
      })
      .catch(error => {
        console.error('Error adding availability', error);
      });
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Gestion des Disponibilités</h2>
      <ul>
        {availabilities.map((item) => (
          <li key={item.id} className="border-b py-2">
            {item.date} de {item.startTime} à {item.endTime}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddAvailability} className="mt-4">
        <div className="mb-2">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={newAvailability.date}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Heure de début:</label>
          <input
            type="time"
            name="startTime"
            value={newAvailability.startTime}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Heure de fin:</label>
          <input
            type="time"
            name="endTime"
            value={newAvailability.endTime}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Ajouter disponibilité
        </button>
      </form>
    </div>
  );
}

export default AvailabilityManager;
