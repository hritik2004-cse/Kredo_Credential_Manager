# Kredo Credential Manager

A full-stack credential manager application built with Next.js for the frontend and Express.js + MongoDB for the backend.

## 🚀 Tech Stack

### Frontend (Client)
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Icons:** React Icons
- **Package Manager:** pnpm

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** [Express.js 5](https://expressjs.com/)
- **Database:** MongoDB with [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT, bcrypt (supports local and Google auth)
- **Validation:** [Zod](https://zod.dev/)
- **Language:** TypeScript
- **Package Manager:** pnpm

## 📁 Project Structure

This project uses a monorepo setup containing two main directories:

- `/client` - Contains the Next.js frontend application.
- `/server` - Contains the Express.js backend API.

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Kredo_Credential_Manager
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
pnpm install
```

Create a `.env` file in the `server` directory and configure the required environment variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=10
# Add JWT secrets or other env variables as needed
```

Start the backend development server:
```bash
pnpm run dev
```
The API will run on `http://localhost:<PORT>` (e.g., `http://localhost:8000`).

### 3. Frontend Setup
Open a new terminal window, navigate to the client directory, and install dependencies:
```bash
cd client
pnpm install
```

Start the frontend development server:
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔒 Features
- **User Authentication:** Secure local authentication using JWT and bcrypt, with support for email verification and OAuth (Google).
- **Modern UI:** Built with Next.js and Tailwind CSS for a highly responsive and fast user interface.
- **Type Safety:** End-to-end type safety with TypeScript and Zod for schema validation.
