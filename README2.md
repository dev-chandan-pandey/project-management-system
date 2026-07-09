# 🌍 Environment Variables

# Project Collaboration & Task Management System

This document explains all environment variables required to run the application locally and in production.

---

# Project Structure

```text
project-management-system/

├── frontend/
│   └── .env.local
│
└── backend/
    └── .env
```

---

# Backend Environment Variables

Create a file named:

```text
backend/.env
```

Example:

```env
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project_management

JWT_SECRET=your_super_secret_jwt_key

CLIENT_URL=http://localhost:3000
```

---

# Backend Variables Explained

## PORT

Application server port.

Example

```env
PORT=5000
```

Production

Render automatically provides a port.

If your hosting platform injects a `PORT` variable, you don't need to set it manually.

---

## MONGODB_URI

MongoDB Atlas connection string.

Example

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project_management
```

Used by

* Mongoose
* Database Connection

Example URI

```text
mongodb+srv://<username>:<password>@cluster.mongodb.net/project_management
```

---

## JWT_SECRET

Secret key used to sign JWT tokens.

Example

```env
JWT_SECRET=my_super_secure_secret_key
```

Recommendations

* Minimum 32 characters
* Never commit to Git
* Use a randomly generated string

Example

```text
7e3af91e90fd5b2f5cf39f7b7d6bca8cb05d18db54b1f4fa
```

---

## CLIENT_URL

Frontend URL allowed by CORS.

Local

```env
CLIENT_URL=http://localhost:3000
```

Production

```env
CLIENT_URL=https://your-app.vercel.app
```

Used for

* CORS configuration
* Cross-origin API requests

---

# Frontend Environment Variables

Create

```text
frontend/.env.local
```

Example

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# Frontend Variables Explained

## NEXT_PUBLIC_API_URL

Base URL for backend REST APIs.

Local

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Production

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

Used by

* Axios
* API Services
* Authentication
* Dashboard
* Projects
* Tasks
* Team
* Activities

---

# Local Development

Backend

```env
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project_management

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:3000
```

Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# Production Configuration

Backend (Render)

```env
PORT=10000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project_management

JWT_SECRET=your_production_secret

CLIENT_URL=https://your-project.vercel.app
```

Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

---

# Environment Variable Usage

## Backend

| Variable    | Used In        | Purpose                      |
| ----------- | -------------- | ---------------------------- |
| PORT        | Server         | Starts Express server        |
| MONGODB_URI | Database       | MongoDB connection           |
| JWT_SECRET  | Authentication | JWT signing and verification |
| CLIENT_URL  | CORS           | Allows frontend access       |

---

## Frontend

| Variable            | Used In | Purpose              |
| ------------------- | ------- | -------------------- |
| NEXT_PUBLIC_API_URL | Axios   | Backend API base URL |

---

# Security Best Practices

✅ Never commit `.env` files to GitHub.

Ensure the following files are included in `.gitignore`:

```gitignore
.env

.env.local

.env.production

.env.development
```

---

# Deployment

## Backend (Render)

Set the following environment variables in the Render dashboard:

* PORT
* MONGODB_URI
* JWT_SECRET
* CLIENT_URL

---

## Frontend (Vercel)

Set the following environment variable in the Vercel dashboard:

* NEXT_PUBLIC_API_URL

---

# Verification Checklist

After configuring environment variables:

* Backend starts successfully.
* MongoDB connects successfully.
* JWT authentication works.
* Frontend can communicate with backend APIs.
* Login and registration work correctly.
* Protected routes are accessible after authentication.
* CORS errors do not occur.

---

# Example Directory Structure

```text
project-management-system/

├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env.local
```

---

# Notes

* `NEXT_PUBLIC_` prefixed variables are exposed to the browser and should never contain secrets.
* Keep `JWT_SECRET` private and unique for each environment.
* Use different environment variable values for local development and production.
* Rotate secrets periodically for improved security.

---

This project uses environment variables to separate configuration from source code, ensuring secure credential management and simplifying deployment across development and production environments.
