import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', skills: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) alert('Registration Successful!');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
        <textarea placeholder="Your Skills (e.g., Teaching, IT)" onChange={e => setFormData({...formData, skills: e.target.value})} />
        <button type="submit">Register as Volunteer</button>
      </form>
    </div>
  );
}