// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import api from '../api';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users')
      .then(response => {
        setUsers(response.data.users || []);
      })
      .catch(error => {
        console.error("Error fetching users list", error);
      });
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete('/users', {
        data: { user_id: userId }
      });
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-2">User List (Admin Only)</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} className="border-b py-2 flex justify-between items-center">
              <span>{user.name} - {user.email} - {user.role}</span>
              <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
