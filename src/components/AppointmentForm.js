// src/components/AppointmentForm.js
import React, { useState } from 'react';
import api from '../api';

function AppointmentForm() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/appointments', formData)
      .then(response => {
        alert('Appointment created successfully');
        setFormData({ title: '', date: '', time: '', description: '' });
      })
      .catch(error => {
        console.error('Error creating appointment', error);
        alert('Error creating appointment');
      });
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mt-4">
      <h2 className="text-xl font-semibold mb-2">Prendre un rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700">Titre:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Heure:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Prendre rendez-vous
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
