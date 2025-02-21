// src/components/Schedule.js
import React, { useState, useEffect } from 'react';
import api from '../api';

function Schedule() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments')
      .then(response => {
         setAppointments(response.data);
      })
      .catch(error => {
         console.error("Error fetching appointments", error);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Planning</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="border-b py-2">
            <div className="font-bold">{appointment.title}</div>
            <div>{appointment.date} - {appointment.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
