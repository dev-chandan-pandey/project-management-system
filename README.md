# 🚀 Project Collaboration & Task Management System

A full-stack **Project Collaboration & Task Management System** built with **Next.js, Node.js, Express.js, MongoDB, and TypeScript**.

The application enables teams to collaborate efficiently by managing projects, assigning tasks, tracking progress through a Kanban board, monitoring activities, and viewing real-time project analytics.

This project was developed as part of the **Geeth LLC Full Stack Developer Technical Assessment**.

---

# 🌐 Live Demo

## Frontend

**Live URL**

> https://project-management-system-wine-zeta.vercel.app

## Backend

**API URL**

> https://project-management-system-3wep.onrender.com/api

---

# 📷 Screenshots

> Add screenshots before submission.

- Login
- Dashboard
- Projects
- Tasks
- Kanban Board
- Team Management
- Activity Timeline

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Persistent Login
- Role-Based Authorization

### Roles

- Admin
- Project Manager
- Team Member

---

## 📊 Dashboard

Interactive analytics dashboard including

- Total Projects
- Total Tasks
- Completed Tasks
- Todo Tasks
- In Progress Tasks
- Archived Projects
- Team Members

Additional dashboard widgets

- Task Status Chart
- Project Status Chart
- Recent Projects
- Latest Tasks
- Recent Activity

---

## 📁 Project Management

- Create Project
- Update Project
- Delete Project
- View Project Details
- Assign Team Members
- Search Projects
- Filter by Status
- Pagination

Project Status

- Planning
- Active
- Completed
- Archived

---

## ✅ Task Management

- Create Task
- Update Task
- Delete Task
- Assign Users
- Set Priority
- Due Date
- Search Tasks
- Filter Tasks
- Pagination

Task Status

- Todo
- In Progress
- Completed

Priority

- Low
- Medium
- High

---

## 📌 Kanban Board

Interactive drag-and-drop board

Columns

- Todo
- In Progress
- Completed

Features

- Drag & Drop
- Instant Database Update
- Optimistic UI Update
- Responsive Design

---

## 👥 Team Management

- View Team Members
- Search Users
- Filter by Role
- Edit User
- Delete User
- Assign Projects
- View Assigned Projects
- View Assigned Tasks

---

## 📜 Activity Timeline

Tracks important system events

Examples

- User Registered
- Project Created
- Project Updated
- Project Deleted
- Task Created
- Task Assigned
- Task Status Updated
- Task Completed
- Task Deleted

---

## 🔍 Search & Filters

### Projects

- Search by Name
- Filter by Status

### Tasks

- Search by Name
- Filter by Status
- Filter by Priority
- Filter by Assigned User

### Team

- Search by Name
- Search by Email
- Filter by Role

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Axios
- Zustand
- DnD Kit
- Recharts
- Lucide React

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Zod Validation

---

## Database

MongoDB Atlas

Collections

- Users
- Projects
- Tasks
- Activities

---

# 🏗 Project Architecture

```
Frontend (Next.js)

        │

        ▼

Axios API Layer

        │

        ▼

Express REST API

        │

        ▼

Controllers

        │

        ▼

Middleware

        │

        ▼

MongoDB (Mongoose)
```

---

# 📂 Folder Structure

## Frontend

```
src/

app/

components/

hooks/

services/

store/

types/

utils/
```

---

## Backend

```
src/

controllers/

middleware/

models/

routes/

services/

validators/

utils/

config/
```

---

# 🔒 Authentication Flow

```
Register/Login

        │

        ▼

JWT Token Generated

        │

        ▼

Stored in Local Storage

        │

        ▼

Axios Interceptor

        │

        ▼

Protected API Routes
```

---

# 🧩 Database Design

## User

```
Name

Email

Password

Role

Assigned Projects[]

Assigned Tasks[]
```

---

## Project

```
Name

Description

Status

Start Date

End Date

Created By

Members[]
```

---

## Task

```
Title

Description

Priority

Status

Assigned User

Project

Due Date
```

---

## Activity

```
Action

Description

User

Project

Task

Timestamp
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/project-management-system.git
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🌍 Environment Variables

## Backend

Create

```
backend/.env
```

```
PORT=

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=
```

---

## Frontend

Create

```
frontend/.env.local
```

```
NEXT_PUBLIC_API_URL=
```

> Detailed environment variable documentation is available in **ENVIRONMENT.md**.

---

# 📡 API Overview

Authentication

```
POST /api/auth/register

POST /api/auth/login
```

Projects

```
GET /api/projects

GET /api/projects/:id

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id
```

Tasks

```
GET /api/tasks

GET /api/tasks/:id

POST /api/tasks

PUT /api/tasks/:id

PUT /api/tasks/:id/status

DELETE /api/tasks/:id
```

Users

```
GET /api/users

GET /api/users/:id

PUT /api/users/:id

DELETE /api/users/:id
```

Dashboard

```
GET /api/dashboard
```

Activities

```
GET /api/activities
```

> Complete API documentation is available in **API_DOCUMENTATION.md**.

---

# 🔐 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected APIs
- Role-Based Authorization
- Request Validation
- Centralized Error Handling

---

# 🚀 Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- MongoDB Atlas

---

# 📈 Performance Optimizations

- Pagination
- Optimistic UI Updates
- Efficient MongoDB Queries
- Axios Interceptors
- Reusable Components
- Lazy Rendering
- Responsive Layout
- Component Reusability

---

# 📋 Assignment Requirements Covered

- ✅ Authentication
- ✅ Dashboard
- ✅ Project Management
- ✅ Task Management
- ✅ Kanban Board
- ✅ Team Management
- ✅ Search & Filters
- ✅ Activity Timeline
- ✅ MongoDB Database Design
- ✅ REST APIs
- ✅ JWT Authentication
- ✅ Responsive UI
- ✅ Pagination
- ✅ Deployment

---

# 🔮 Future Improvements

- Socket.IO Real-Time Updates
- Email Notifications
- File Attachments
- Dark Mode
- Calendar View
- Comments on Tasks
- Push Notifications

---

# 👨‍💻 Author

**Chandan Pandey**

Full Stack Developer

GitHub: https://github.com/YOUR_USERNAME

LinkedIn: https://linkedin.com/in/YOUR_PROFILE

Email: YOUR_EMAIL

---

# 📄 License

This project was developed for the **Geeth LLC Full Stack Developer Technical Assessment** and is intended for evaluation purposes.