# DevPulse Issue Tracker API

A RESTful backend API for managing software project issues, bug reports, and feature requests.  
Built with Node.js, Express, TypeScript, PostgreSQL, and JWT Authentication.

---

# Live URL

Add your live backend URL here:

```bash
https://your-live-url.com
```

---

# Features

- User Registration & Login
- JWT Authentication & Authorization
- Role-based Access Control
- Create Bug Reports & Feature Requests
- Update Issues with Permission Validation
- Delete Issues (Maintainer Only)
- Filter & Sort Issues
- Secure Password Hashing using bcrypt
- PostgreSQL Database Integration
- Structured API Response Format
- Global Error Handling

---

# Tech Stack

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- PostgreSQL

## Authentication
- JWT (jsonwebtoken)
- bcryptjs

## Other Tools
- dotenv
- cors
- nodemon
- ts-node-dev

---

# Project Structure

```bash
src/
│
├── modules/
│   ├── auth/
│   └── issues/
│
├── middleware/
│
├── utils/
│
├── db/
│
├── types/
│
├── app.ts
└── server.ts
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <your-github-repo-url>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env` File

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret
```

---

## 4. Run Development Server

```bash
npm run dev
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/signup
```

### Login User

```http
POST /api/auth/login
```

---

## Issues

### Create Issue

```http
POST /api/issues
```

Access:
- Contributor
- Maintainer

---

### Get All Issues

```http
GET /api/issues
```

Query Params:

| Param | Values |
|---|---|
| sort | newest, oldest |
| type | bug, feature_request |
| status | open, in_progress, resolved |

Example:

```http
GET /api/issues?sort=newest&type=bug
```

---

### Get Single Issue

```http
GET /api/issues/:id
```

---

### Update Issue

```http
PATCH /api/issues/:id
```

Access:
- Maintainer → Any Issue
- Contributor → Own Issue (Only if status is open)

---

### Delete Issue

```http
DELETE /api/issues/:id
```

Access:
- Maintainer Only

---

# Authentication

Use JWT token in request headers:

```http
Authorization: Bearer YOUR_TOKEN
```

---

# Database Schema Summary

## Users Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR |
| email | UNIQUE VARCHAR |
| password | TEXT |
| role | contributor / maintainer |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## Issues Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(150) |
| description | TEXT |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# Standard API Response

## Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": "Error details"
}
```

---

# Author

MD. Al-Amin