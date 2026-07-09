# 📡 API Documentation

# Project Collaboration & Task Management System

Base URL

```
Production

https://YOUR-RENDER-URL.onrender.com/api
```

```
Local

http://localhost:5000/api
```

---

# Authentication

JWT Authentication is used for all protected endpoints.

Include the token in the Authorization header.

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Response Format

## Success

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Authentication APIs

## Register User

### POST

```
/auth/register
```

### Description

Creates a new user account.

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "Team Member"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "JWT_TOKEN",
    "user": {}
  }
}
```

---

## Login

### POST

```
/auth/login
```

### Request

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {}
  }
}
```

---

## Current User

### GET

```
/auth/me
```

### Authentication

Required

### Success Response

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John",
    "email": "john@example.com",
    "role": "Admin"
  }
}
```

---

# Dashboard APIs

## Get Dashboard Statistics

### GET

```
/dashboard
```

### Authentication

Required

### Response

```json
{
  "success": true,
  "data": {
    "metrics": {},
    "charts": {},
    "latestTasks": [],
    "recentProjects": [],
    "recentActivities": [],
    "currentUser": {}
  }
}
```

---

# Project APIs

## Get All Projects

### GET

```
/projects
```

### Query Parameters

| Parameter | Description    |
| --------- | -------------- |
| page      | Page Number    |
| limit     | Items Per Page |
| search    | Project Name   |
| status    | Project Status |

### Example

```
GET /projects?page=1&limit=10&search=CRM
```

---

## Get Project

### GET

```
/projects/:id
```

---

## Create Project

### POST

```
/projects
```

### Authentication

Admin

Project Manager

### Request

```json
{
  "name": "CRM",
  "description": "CRM System",
  "startDate": "2026-01-01",
  "endDate": "2026-03-01",
  "status": "Planning",
  "members": [
    "USER_ID"
  ]
}
```

---

## Update Project

### PUT

```
/projects/:id
```

---

## Assign Members

### PUT

```
/projects/:id/members
```

### Request

```json
{
  "members": [
    "USER_ID_1",
    "USER_ID_2"
  ]
}
```

---

## Delete Project

### DELETE

```
/projects/:id
```

Admin Only

---

# Task APIs

## Get Tasks

### GET

```
/tasks
```

### Query Parameters

| Parameter  | Description                    |
| ---------- | ------------------------------ |
| page       | Page Number                    |
| limit      | Items Per Page                 |
| search     | Task Name                      |
| project    | Project ID                     |
| assignedTo | User ID                        |
| priority   | Low / Medium / High            |
| status     | Todo / In Progress / Completed |

---

## Get Task

### GET

```
/tasks/:id
```

---

## Create Task

### POST

```
/tasks
```

### Request

```json
{
  "title": "Build Dashboard",
  "description": "Create analytics dashboard",
  "priority": "High",
  "status": "Todo",
  "assignedTo": "USER_ID",
  "project": "PROJECT_ID",
  "dueDate": "2026-01-20"
}
```

---

## Update Task

### PUT

```
/tasks/:id
```

---

## Update Task Status

### PUT

```
/tasks/:id/status
```

### Request

```json
{
  "status": "Completed"
}
```

---

## Delete Task

### DELETE

```
/tasks/:id
```

---

# Team APIs

## Get Users

### GET

```
/users
```

### Query Parameters

| Parameter | Description    |
| --------- | -------------- |
| page      | Page Number    |
| limit     | Items Per Page |
| search    | Name or Email  |
| role      | User Role      |

---

## Get User

### GET

```
/users/:id
```

---

## Update User

### PUT

```
/users/:id
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Project Manager"
}
```

---

## Delete User

### DELETE

```
/users/:id
```

Admin Only

---

# Activity APIs

## Get Activities

### GET

```
/activities
```

### Query Parameters

| Parameter | Description    |
| --------- | -------------- |
| page      | Page Number    |
| limit     | Items Per Page |

---

# User Roles

| Role            | Permissions                                      |
| --------------- | ------------------------------------------------ |
| Admin           | Full access to all modules                       |
| Project Manager | Manage projects and tasks                        |
| Team Member     | View assigned projects and manage assigned tasks |

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Resource Not Found    |
| 409  | Conflict              |
| 500  | Internal Server Error |

---

# Authentication Flow

```
Register/Login

↓

JWT Token Generated

↓

Stored on Client

↓

Axios Interceptor

↓

Authorization Header

↓

Protected APIs
```

---

# Validation

The backend validates incoming requests using Zod.

Examples include:

* Required fields
* Email format
* Password length
* Enum validation
* Invalid ObjectId handling
* Invalid status and priority values

---

# Error Handling

All APIs return consistent error responses.

Example

```json
{
  "success": false,
  "message": "Task not found"
}
```

---

# Pagination

Supported endpoints

* Projects
* Tasks
* Users
* Activities

Response format

```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "total": 50,
    "totalPages": 5
  }
}
```

---

# Security

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Authorization
* Request Validation
* Centralized Error Handling

---

# Technology Stack

Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios
* Zustand
* DnD Kit
* Recharts

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Zod

---

This API follows RESTful design principles with role-based access control, consistent response structures, server-side pagination, and secure JWT authentication.
