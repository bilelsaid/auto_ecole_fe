// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Schedule from './components/Schedule';
import AppointmentForm from './components/AppointmentForm';
import AvailabilityManager from './components/AvailabilityManager';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/users">User List</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Schedule />
                  <AppointmentForm />
                </div>
                <div>
                  <AvailabilityManager />
                </div>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
