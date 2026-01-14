
# 🚗 Vehicle Management System

A full-stack vehicle management system with secure authentication and role-based access control (RBAC).

---

## 🔥 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt

### Frontend
- React.js
- Axios
- React Router

---

## 🔐 Features

### Authentication & Authorization
- Login using email & password
- JWT-based authentication
- Role-based access (Admin / User)

### Admin Features
- Create, update, delete users
- Create, update, delete vehicles
- Assign vehicles to users
- View all vehicles & users

### User Features
- View assigned vehicles only
- Secure dashboard access

---

## 📡 API Endpoints

### Auth
- POST `/api/auth/login`
- POST `/api/auth/register`

### Users (Admin)
- GET `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

### Vehicles
- POST `/api/vehicles`
- GET `/api/vehicles`
- PUT `/api/vehicles/:id`
- DELETE `/api/vehicles/:id`
- PUT `/api/vehicles/:id/assign`
- GET `/api/vehicles/my`

---

Email: admin@test.com

Password: 123456

## 🧪 Test Credentials

### Admin
