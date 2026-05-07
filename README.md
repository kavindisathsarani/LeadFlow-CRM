# LeadFlow CRM - Full Stack Lead Management System

LeadFlow CRM is a full-stack Customer Relationship Management (CRM) application designed for small sales teams to manage leads, track sales pipelines, monitor deal progress, and organize customer interactions efficiently.

The system allows authenticated users to create, update, delete, and manage leads while tracking lead statuses, deal values, and notes through a modern dashboard interface.

---

# Project Overview

This application was developed as a Full-Stack CRM using the MERN stack.

The project demonstrates:

* Frontend development with React
* Backend API development with Node.js and Express
* MongoDB database integration
* JWT authentication
* CRUD operations
* Dashboard analytics
* Search and filtering functionality
* Clean UI/UX design

---

# Tech Stack Used

## Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* React Router DOM
* Axios
* Lucide React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv
* cors

---

# Features Implemented

## Authentication

* JWT-based login authentication
* Protected routes
* Persistent login using localStorage

## Lead Management

* Create new leads
* View all leads
* Edit leads
* Delete leads
* Update lead status
* View lead details

## Lead Notes

* Add notes to leads
* View lead-specific notes

## Dashboard

* Total leads
* New leads
* Qualified leads
* Won leads
* Lost leads
* Total estimated deal value
* Total won deal value

## Search & Filtering

* Filter by status
* Filter by lead source
* Filter by salesperson
* Search by lead name, company, or email

---

# Project Structure

```bash
LeadFlow-CRM/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── utils/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
```

---

# Backend Setup

## 1. Navigate to server folder

```bash
cd server
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment file

Create a `.env` file inside the `server` folder.

## 4. Add environment variables

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/leadflow_crm
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRES_IN=1d
```

## 5. Start backend server

```bash
npm run dev
```

Backend Base URL:

```bash
http://localhost:5000/api
```

---

# Frontend Setup

## 1. Navigate to client folder

```bash
cd client
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create environment file

Create a `.env` file inside the `client` folder.

## 4. Add frontend environment variable

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 5. Start frontend

```bash
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

---

# Database Setup

This project uses MongoDB as the primary database.

## Option 1 - Local MongoDB

Make sure MongoDB is installed and running locally.

Default local connection:

```env
mongodb://127.0.0.1:27017/leadflow_crm
```

## Option 2 - MongoDB Atlas

You may also use MongoDB Atlas by replacing the `MONGO_URI` value with your Atlas connection string.

---

# Test Login Credentials

```txt
Email: admin@example.com
Password: password123
```

---

# API Endpoints

## Authentication

### Login

```http
POST /api/auth/login
```

---

## Leads

### Create Lead

```http
POST /api/leads
```

### Get All Leads

```http
GET /api/leads
```

### Get Single Lead

```http
GET /api/leads/:id
```

### Update Lead

```http
PUT /api/leads/:id
```

### Delete Lead

```http
DELETE /api/leads/:id
```

---

## Notes

### Add Note

```http
POST /api/notes
```

### Get Notes by Lead

```http
GET /api/notes/:leadId
```

---

## Dashboard

### Get Dashboard Statistics

```http
GET /api/dashboard
```

---

# Sample API Responses

## Login Success

```json
{
  "success": true,
  "token": "jwt.token.here",
  "user": {
    "id": "1",
    "email": "admin@example.com",
    "name": "CRM Admin"
  }
}
```

---

## Lead Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "681a4f232a5f9d1234abcd98",
      "name": "John Doe",
      "company": "Acme Inc",
      "email": "john@acme.com",
      "phone": "+1 222 333 4444",
      "source": "LinkedIn",
      "salesperson": "Jane Smith",
      "status": "Qualified",
      "dealValue": 15000,
      "createdAt": "2026-05-06T10:11:12.000Z",
      "updatedAt": "2026-05-06T10:11:12.000Z"
    }
  ]
}
```

---

## Dashboard Response

```json
{
  "success": true,
  "data": {
    "totalLeads": 12,
    "newLeads": 3,
    "qualifiedLeads": 4,
    "wonLeads": 2,
    "lostLeads": 1,
    "totalDealValue": 120000,
    "totalWonValue": 45000
  }
}
```

---

# Environment Variables

## Backend (`server/.env`)

```env
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
```

## Frontend (`client/.env`)

```env
VITE_API_BASE_URL=
```


# Reflection

This project helped strengthen my understanding of full-stack MERN development, JWT authentication, REST API design, MongoDB relationships, and frontend-backend integration.

During development, I improved my skills in:

* Building protected APIs
* Managing application state
* Designing reusable React components
* Structuring scalable backend architecture
* Implementing search and filtering features
* Debugging authentication and API integration issues

One of the most valuable learning experiences was integrating JWT authentication with protected frontend routes and ensuring secure API communication between the client and server.

---

# Demo Video

demo video link here:

```txt
https://drive.google.com/file/d/1zN89hvRXPZeTDjuNbMA4oqnFKHjauOh-/view?usp=sharing
```

---

# Deployed Application

🔗 Live Demo:  
https://lead-flow-crm-258q-p0xp1i5r8-kavindisathsaranis-projects.vercel.app

# GitHub Repository

GitHub repository link here:

```txt
https://github.com/kavindisathsarani/LeadFlow-CRM.git
```
