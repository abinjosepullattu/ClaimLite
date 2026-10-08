# ClaimLite

ClaimLite is an insurance policyholder and claims management application built using the **MEAN stack**.

The project is divided into two applications:

- **Backend** - Node.js, Express.js and MongoDB
- **Frontend** - Angular, Nx and Duet Design System

---

# 🏗️ Project Architecture

```text
ClaimLite/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   └── claimController.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Claim.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── claimRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── apps/
│   │   ├── claimlite/
│   │   └── claimlite-e2e/
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── nx.json
│   └── README.md
│
└── README.md
```

---

# 🚀 Features

## Policyholder Management

- Register a new policyholder
- Validate name, email and phone
- Prevent duplicate email addresses
- View all registered policyholders
- Display formatted phone numbers
- Display registration dates

## Claim Management

- Log an insurance claim
- Select a registered policyholder
- Select claim type
- Enter claim amount
- Enter claim description
- Validate claim information
- View all logged claims
- Display associated policyholder name

---

# 🛠️ Technology Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Frontend

- Angular 21
- Nx 22.6.0
- TypeScript 5.9.3
- Duet Design System
- Angular Reactive Forms
- Angular HttpClient
- esbuild
- Vitest
- Playwright

---

# 🔌 API

The backend runs on:

```text
http://localhost:3000
```

API base URL:

```text
http://localhost:3000/api
```

## Policyholder APIs

### Get all policyholders

```http
GET /api/users
```

### Create policyholder

```http
POST /api/users
```

Example:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

---

## Claim APIs

### Get all claims

```http
GET /api/claims
```

### Create claim

```http
POST /api/claims
```

Example:

```json
{
  "userId": "66f123456789abcdef123456",
  "claimType": "Health",
  "amount": 1250.5,
  "description": "Medical expenses for recent treatment"
}
```

---

# 👤 Policyholder Validation

The application validates:

### Full Name

- Required
- Minimum 2 characters
- Maximum 50 characters
- Cannot contain only whitespace

### Email

- Required
- Valid email format
- Converted to lowercase before submission
- Must be unique

### Phone

- Required
- Exactly 10 digits

Phone numbers are displayed in the UI as:

```text
(987) 654-3210
```

---

# 📝 Claim Validation

### Policyholder

A valid registered policyholder must be selected.

If no policyholders exist, the application displays:

```text
Action Required: You must register at least one Policyholder before logging a claim.
```

Claim submission is disabled until a policyholder exists.

### Claim Type

Supported values:

```text
Auto
Home
Health
```

### Amount

- Greater than 0
- Maximum 1,000,000
- Maximum 2 decimal places

Examples:

```text
1250
1250.5
1250.50
```

### Description

- Required
- Minimum 10 characters
- Maximum 500 characters

---

# 📋 User Interface

The frontend uses the **Duet Design System** for its main UI components.

The application contains:

```text
Home
Policyholders
Claims
```

Policyholder page:

```text
Policyholders
└── Add Policyholder
```

Claims page:

```text
Claims
└── Log Claim
```

---

# 🔄 Application Flow

## Policyholder

```text
Home
  ↓
Policyholders
  ↓
Add Policyholder
  ↓
Enter details
  ↓
Frontend validation
  ↓
POST /api/users
  ↓
Success / error response
  ↓
Policyholder list
```

## Claim

```text
Claims
  ↓
Log Claim
  ↓
Load policyholders
  ↓
Select policyholder
  ↓
Select claim type
  ↓
Enter amount
  ↓
Enter description
  ↓
Frontend validation
  ↓
POST /api/claims
  ↓
Success / error response
  ↓
Claims list
```

---

# ⚙️ Prerequisites

Install:

- Node.js
- npm
- MongoDB

Both backend and frontend dependencies must be installed before running the application.

---

# 📦 Backend Setup

Open a terminal in the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure the backend `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/claimlite
CORS_ORIGIN=http://localhost:4200
```

Start the backend:

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

---

# 🎨 Frontend Setup

Open another terminal in the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Angular application:

```bash
npx nx serve claimlite
```

Open:

```text
http://localhost:4200
```

---

# 🔗 Local Development

Run the backend and frontend in separate terminals.

### Terminal 1

```bash
cd backend
npm start
```

### Terminal 2

```bash
cd frontend
npx nx serve claimlite
```

Then open:

```text
http://localhost:4200
```

The frontend communicates with:

```text
http://localhost:3000/api
```

---

# 🏭 Production Build

From the frontend directory:

```bash
npx nx build claimlite
```

Build output:

```text
frontend/dist/apps/claimlite
```

The production build has been successfully verified.

---

# 🧪 Testing

The frontend workspace is configured with:

- Vitest for unit testing
- Playwright for end-to-end testing

Unit tests:

```bash
cd frontend
npx nx test claimlite
```

---

# 🌐 Ports

| Application | URL |
|---|---|
| Frontend | `http://localhost:4200` |
| Backend | `http://localhost:3000` |
| API | `http://localhost:3000/api` |

---

# 📁 Frontend Documentation

Detailed frontend documentation is available in:

```text
frontend/README.md
```

It contains:

- Angular/Nx structure
- Components
- Services
- Routes
- Duet Design System integration
- Reactive Forms
- Validation
- UI behavior
- Nx commands

---

# 📁 Backend Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   └── claimController.js
│
├── middleware/
│   └── errorHandler.js
│
├── models/
│   ├── User.js
│   └── Claim.js
│
├── routes/
│   ├── userRoutes.js
│   └── claimRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

# 🗄️ Database

The application uses MongoDB.

Database:

```text
claimlite
```

Main collections:

```text
users
claims
```

Claims reference policyholders using MongoDB ObjectIds.

The claim list uses backend population to retrieve the associated policyholder name.

---

# ✅ Current Implementation Status

```text
✅ Angular frontend
✅ Nx workspace
✅ Duet Design System
✅ Global navigation
✅ Landing page
✅ Policyholder registration
✅ Policyholder validation
✅ Duplicate email handling
✅ Policyholder list
✅ Claim registration
✅ Claim validation
✅ Dynamic policyholder selection
✅ Zero-policyholder protection
✅ Claims list
✅ Populated policyholder names
✅ Currency formatting
✅ Date formatting
✅ API error handling
✅ Loading/submission states
✅ MongoDB integration
✅ REST APIs
✅ Production frontend build
```

---

# 📌 Important Notes

The backend must be running before using the frontend because the frontend retrieves and submits data through the REST API.

For local development:

```text
Frontend → http://localhost:4200
           ↓
Backend  → http://localhost:3000
           ↓
MongoDB  → claimlite
```