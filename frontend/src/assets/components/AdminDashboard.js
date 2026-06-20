import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Assuming the admin is logged in and token is in localStorage
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/admin/volunteers', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setVolunteers(data))
    .catch(err => console.error(err));
  }, []);

  const generateCSVReport = () => {
    const headers = "Name,Email,Skills,Registration Date\n";
    const rows = volunteers.map(v => `${v.name},${v.email},"${v.skills}",${new Date(v.registrationDate).toLocaleDateString()}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Volunteer_Report.csv';
    a.click();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <button onClick={generateCSVReport} style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}>
        Download Volunteer Report (CSV)
      </button>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Date Registered</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.length > 0 ? volunteers.map(vol => (
            <tr key={vol._id}>
              <td>{vol.name}</td>
              <td>{vol.email}</td>
              <td>{vol.skills}</td>
              <td>{new Date(vol.registrationDate).toLocaleDateString()}</td>
            </tr>
          )) : <tr><td colSpan="4">No volunteers found or unauthorized access.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}