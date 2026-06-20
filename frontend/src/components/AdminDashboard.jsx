import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(''); // State for unauthorized access message
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // CONDITIONAL CHECK: If no token exists, immediately stop and show error
    if (!token) {
      setError('Access Denied. You must be logged in as an Admin to view this page.');
      return;
    }

    // Fetch data using the JWT Token for Authorization
    fetch('http://localhost:5001/api/admin/volunteers', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setVolunteers(data);
    })
    .catch(err => {
      console.error(err);
      setError('Unauthorized access or server error. Your token may have expired.');
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const generateCSVReport = () => {
    const headers = "Name,Email,Skills,Registration Date\n";
    const rows = volunteers.map(v => `${v.name},${v.email},"${v.skills}",${new Date(v.registrationDate).toLocaleDateString()}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NayePankh_Volunteer_Report.csv';
    a.click();
  };

  // CONDITIONAL RENDER: If there is an error, show the error screen instead of the table
  if (error) {
    return (
      <div className="dashboard-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: '#d9534f' }}>{error}</h2>
        <button onClick={handleLogout} style={{ width: '200px', marginTop: '20px' }}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ width: 'auto', backgroundColor: '#6c757d' }}>Logout</button>
      </div>

      <button onClick={generateCSVReport} className="export-btn" style={{ marginTop: '20px' }}>
        Download Volunteer Report (CSV)
      </button>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
          )) : <tr><td colSpan="4" style={{ textAlign: 'center' }}>No volunteers found.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}