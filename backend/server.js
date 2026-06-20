 
require('dotenv').config();  
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
// Replace app.use(cors()); with this:
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend URL
  credentials: true
}));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));
 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Add this temporarily to test the connection
 