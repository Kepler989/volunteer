import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // State for conditional error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();

      if (res.ok) {
        // Store the JWT token securely
        localStorage.setItem('token', data.token);
        
        // Redirect based on role
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          // Normal volunteers don't have a dashboard in this spec, so we keep them here or send home
          setError('Login successful! (Volunteer dashboard not yet built)');
        }
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('A server error occurred. Is the backend running?');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      
      {/* CONDITIONAL RENDER: Shows Error Messages */}
      {error && (
        <div style={{ color: '#d9534f', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
        
        <button type="submit">Login</button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
        Don't have an account? <a href="/" style={{ color: 'var(--primary-color)' }}>Register here</a>.
      </p>
    </div>
  );
}