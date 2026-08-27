# Kredo Credential Manager

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Kredo is a full-stack personal credential management platform designed to help users securely organize and manage their important digital information in one place. Users can create an account, authenticate securely, and manage different types of personal data such as social media profiles, important documents, notes, and other credentials.

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
git clone https://github.com/hritik2004-cse/Kredo_Credential_Manager
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
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET=your_jwt_access_secret_here
JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_here
JWT_ACCESS_TOKEN_EXPIRY=900
JWT_REFRESH_TOKEN_EXPIRY=604800
CLIENT_URL=http://localhost:3000
EMAIL_JS_SERVICE_ID=your_emailjs_service_id
EMAIL_JS_PUBLIC_KEY=your_emailjs_public_key
EMAIL_JS_PRIVATE_KEY=your_emailjs_private_key
EMAIL_JS_VERIFY_EMAIL_TEMPLATE=your_emailjs_verify_template
EMAIL_JS_RESET_PASSWORD_TEMPLATE=your_emailjs_reset_template
EMAIL_VERIFICATION_TOKEN_EXPIRY=900
RESET_PASSWORD_TOKEN_EXPIRY=900
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
- **User Authentication:** Secure local authentication using JWT and bcrypt, with support for email verification (via EmailJS) and OAuth (Google).
- **Modern UI:** Built with Next.js and Tailwind CSS for a highly responsive and fast user interface.
- **Type Safety:** End-to-end type safety with TypeScript and Zod for schema validation.
