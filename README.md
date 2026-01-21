# NEXTDEVSOLUTION Clone - MERN Stack

A complete replication of https://www.NEXTDEVSOLUTION.com/ using MongoDB, Express, React, and Node.js.

## Features

- **Frontend**: React with Tailwind CSS 4.0.
- **Backend**: Node.js, Express, MongoDB.
- **CMS Admin Panel**: Manage all content, services, packages, and view contact form submissions.
- **Authentication**: JWT-based admin authentication.
- **Responsive Design**: Fully mobile-friendly layout.
- **Animations**: Framer Motion for smooth transitions.

## Project Structure

```
/client  - React Frontend
/server  - Node.js Backend
```

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB installed and running locally (or use MongoDB Atlas)

### 2. Backend Setup
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file (one is already provided with defaults).
   - Ensure `MONGO_URI` is correct.
4. Seed the Database (Create admin and initial data):
   ```bash
   npm run seed
   ```
   *Default Admin: `admin` / `password123`*
5. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 4. Access the Application
- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login

## Technologies Used
- **Frontend**: React, Tailwind CSS, Vite, Lucide React, Framer Motion, Axios, React Hook Form.
- **Backend**: Express, Mongoose, JWT, Multer (for file uploads), Bcryptjs.
- **Database**: MongoDB.
