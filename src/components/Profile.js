// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../api';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/getUserById')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data", error);
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    api.post('/logout')
      .then(() => {
        alert('Logged out successfully');
        setUser(null);
      })
      .catch(error => {
        console.error("Logout failed", error);
      });
  };

  if (!user) {
    return <div className="bg-white shadow-md rounded p-4">You are not logged in.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">User Profile</h2>
      <ul>
        {Object.keys(user).map((key) => (
          <li key={key} className="mb-1">
            <strong>{key}:</strong> {typeof user[key] === 'object' ? JSON.stringify(user[key]) : user[key]}
          </li>
        ))}
      </ul>
      <button 
        onClick={handleLogout} 
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
