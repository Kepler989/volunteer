# Volunteer Registration System

A full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) to manage volunteer registrations.

## Features

* Volunteer Registration: A clean, responsive form for volunteers to sign up with their details and skills.
* Role-Based Authentication: Secure login system using JSON Web Tokens (JWT). Differentiates between standard 'volunteer' and 'admin' roles.
* Password Security: All user passwords are cryptographically hashed using bcryptjs before being stored in the database.
* Admin Dashboard: A protected route accessible only to administrators to view all registered volunteers.
* Export to CSV: A one-click report generation feature allowing admins to download the volunteer database as a .csv file.
* Modern Frontend: Built with React and Vite for lightning-fast hot module replacement and optimized builds. Includes inline UI feedback for better UX.

## Tech Stack

* Frontend: React.js, Vite, React Router DOM, CSS3
* Backend: Node.js, Express.js
* Database: MongoDB Atlas, Mongoose
* Authentication: JSON Web Tokens (JWT), bcryptjs

## Local Setup & Installation

### Prerequisites
* Node.js installed on your machine.
* A MongoDB Atlas account and cluster setup.

### 1. Backend Setup
Open a terminal and navigate to the backend directory:
cd backend
npm install

Create a .env file in the root of the backend folder and add the following:
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key

Start the backend server:
npm run dev

### 2. Frontend Setup
Open a new, separate terminal and navigate to the frontend directory:
cd frontend
npm install

Start the Vite development server:
npm run dev

### 3. Usage
* Open your browser and navigate to http://localhost:5173/
* Register a new user. 
* Note: By default, the schema registers users as 'volunteer'. To test the Admin Dashboard, you will need to manually change a user's role from 'volunteer' to 'admin' directly inside your MongoDB Atlas collection.
* Navigate to /login, log in with the admin credentials, and view the dashboard!

## API Endpoints

GET /api/test - Health check to verify server status (No Auth Required)
POST /api/register - Registers a new volunteer (No Auth Required)
POST /api/login - Authenticates user and returns JWT (No Auth Required)
GET /api/admin/volunteers - Fetches all volunteer data (Requires Admin JWT)
