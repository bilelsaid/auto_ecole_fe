// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT', // default role
    phone_number: '',
    home_address: '',
    date_of_birth: '',
    // role-specific fields:
    specialty: '',
    specialties: '', // for INSTRUCTOR: comma-separated list
    permissions: ''  // for ADMIN: comma-separated list
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let payload = { ...formData };

    // Adjust payload based on role
    if (formData.role === 'STUDENT') {
      payload.specialty = formData.specialty;
    } else if (formData.role === 'INSTRUCTOR') {
      payload.specialties = formData.specialties.split(',').map(s => s.trim());
    } else if (formData.role === 'ADMIN') {
      payload.permissions = formData.permissions.split(',').map(s => s.trim());
    }

    try {
      await api.post('/register', payload);
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded px-2 py-1">
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Phone Number:</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Home Address:</label>
          <input type="text" name="home_address" value={formData.home_address} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Date of Birth:</label>
          <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        {formData.role === 'STUDENT' && (
          <div className="mb-2">
            <label className="block text-gray-700">Specialty:</label>
            <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        )}
        {formData.role === 'INSTRUCTOR' && (
          <div className="mb-2">
            <label className="block text-gray-700">Specialties (comma separated):</label>
            <input type="text" name="specialties" value={formData.specialties} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        )}
        {formData.role === 'ADMIN' && (
          <div className="mb-2">
            <label className="block text-gray-700">Permissions (comma separated):</label>
            <input type="text" name="permissions" value={formData.permissions} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
        )}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
