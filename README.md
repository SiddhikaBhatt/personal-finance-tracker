# Personal Finance Tracker

A full-stack Personal Finance Tracker application built as part of the **TechBridge Consultancy – Technical Assignment**.

The application allows users to securely manage income and expenses, view transaction history, and analyze spending patterns using charts. It demonstrates clean architecture, role-based access control, authentication, caching, and production-ready deployment.

---

## 🚀 Tech Stack

### Frontend
- React 18 (Vite)
- Axios
- React Router
- Recharts
- CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- Redis (Upstash)
- JWT Authentication
- Role-Based Access Control (Admin, User, Read-only)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL
- Cache: Upstash Redis

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Redis instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/personal-finance-tracker.git
   cd personal-finance-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database and Redis URLs
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Edit .env with your API URL
   npm run dev
   ```

4. **Database Setup**
   Create the following tables in your PostgreSQL database:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     role VARCHAR(50) DEFAULT 'user'
   );

   CREATE TABLE transactions (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     type VARCHAR(50) NOT NULL,
     amount DECIMAL(10,2) NOT NULL,
     category VARCHAR(255) NOT NULL,
     description TEXT,
     date DATE NOT NULL
   );
   ```

### API Documentation
Once the backend is running, visit `http://localhost:5000/api-docs` for Swagger API documentation.

---

## 🔐 Features

- User registration and login
- JWT-based authentication
- Role-based access control
- Add, view, and manage financial transactions
- Redis caching for optimized reads
- Analytics dashboard with charts
- Secure APIs with proper error handling
- Production-ready deployment

---
