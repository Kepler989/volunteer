import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', skills: '' });
  const [message, setMessage] = useState({ type: '', text: '' }); // State for conditional messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    try {
      const res = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Registration Successful! Redirecting to login...' });
        setTimeout(() => navigate('/login'), 2000); // Send them to login after 2 seconds
      } else {
        setMessage({ type: 'error', text: data.error || 'Registration failed. Email might already exist.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Cannot connect to the server. Is the backend running?' });
    }
  };

  return (
    <div className="form-container">
      <h2>Volunteer Registration</h2>
      
      {/* CONDITIONAL RENDER: Shows Error (Red) or Success (Green) Messages */}
      {message.text && (
        <div style={{ 
          color: message.type === 'error' ? '#d9534f' : '#28a745', 
          textAlign: 'center', 
          marginBottom: '15px', 
          fontWeight: 'bold',
          padding: '10px',
          backgroundColor: message.type === 'error' ? '#fdecea' : '#eafaf1',
          borderRadius: '4px'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
        <textarea placeholder="Your Skills (e.g., Teaching, IT)" rows="3" onChange={e => setFormData({...formData, skills: e.target.value})} />
        
        <button type="submit">Register as Volunteer</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
        Already a volunteer? <a href="/login" style={{ color: 'var(--primary-color)' }}>Login here</a>.
      </p>
    </div>
  );
}