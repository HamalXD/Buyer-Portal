# Buyer Portal

A full-stack buyer portal for a real-estate broker where users can register, log in, browse properties, and manage their own favourite properties.

This project demonstrates:

- JWT authentication
- Protected API routes
- MongoDB data modeling with Mongoose
- User-specific favourites
- Redux Toolkit + RTK Query state management
- Error handling and validation

---

# Tech Stack

## Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt password hashing

## Frontend

- React
- Vite
- TypeScript
- Redux Toolkit
- RTK Query
- Tailwind CSS

## CI/CD

- Frontend: Vercel
- Backend: Render(might take a while for the service to run - recommended to run locally if the service is very slow)


---

# Environment Variables

Create a `.env` file inside the **client** and **server** folder as specified by the `.env.example` file in respective folders.


---

# How to Run the Application

## 1. Clone the Repository


git clone https://github.com/HamalXD/Buyer-Portal.git

cd Buyer-Portal


---

# Backend Setup

Navigate to the server folder:


```bash
cd server
npm install
```


Run the backend:

```bash
npm run dev
```

The backend will run on:

```bash
http://localhost:3000
```


---

# Seed Sample Properties (Required)

This step adds sample properties to MongoDB so the application has data.

Run:

```bash
npm run seed
```

Or:

```bash
ts-node-dev src/seed/properties.ts
```

---

# Frontend Setup

Navigate to the client folder:

```bash
cd client
npm install
npm run dev
```

The frontend will run on:


http://localhost:5173


---

# Authentication

This application uses **JWT (JSON Web Tokens)** for authentication.

After login:

- A token is generated
- The token is stored in the frontend
- The token is sent in requests

Header format:


Authorization: Bearer <token>


Protected routes require this header.

---

# API Endpoints

## Auth

### Register


POST /auth/register


Body:


{
"name": "John",
"email": "john@example.com
",
"password": "123456"
}


---

### Login


POST /auth/login


Response:


{
"token": "JWT_TOKEN",
"name": "John",
"role": "buyer"
}


---

## Properties

### Get All Properties


GET /properties


Returns list of available properties.

---

## Favourites (Protected)

These routes require authentication.

### Get User Favourites


GET /favourites


Returns favourites for the logged-in user only.

---

### Add Favourite


POST /favourites/:propertyId


Example:


POST /favourites/65f1a2c9b123456789abcd12


---

### Remove Favourite


DELETE /favourites/:propertyId


Example:


DELETE /favourites/65f1a2c9b123456789abcd12


---

# User Flow

## Step 1 — Register

User creates an account and is redirected to the login page.


POST /auth/register


---

## Step 2 — Login

User logs in and receives a JWT token.


POST /auth/login


---

## Step 3 — View Properties

User views available properties.


GET /properties


---

## Step 4 — Add Favourite

User clicks:


Add to Favourite


Request:


POST /favourites/:propertyId


---

## Step 5 — View Favourites

User navigates to:


/favourites


Request:


GET /favourites


---

## Step 6 — Remove Favourite

User clicks:


Remove from Favourite


Request:


DELETE /favourites/:propertyId


---

# Important Behavior

Each user has their own favourites.

Example:

User A favourites:


Property 1
Property 2


User B favourites:


Property 3


They do not share favourites.

This is enforced using:


user + property


relationship in the database.

---

# Database Models

## User


name
email
password
role
createdAt
updatedAt


---

## Property


title
price
location
description
createdAt
updatedAt


---

## Favourite


user (ObjectId reference to User)
property (ObjectId reference to Property)
createdAt
updatedAt