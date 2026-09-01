# Kredo Credential Manager

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Kredo is a full-stack personal credential management platform designed to help users securely organize and manage their important digital information in one place. Users can create an account, authenticate securely via a complete email-verification flow, and manage different types of personal data such as social media profiles, important documents, notes, and other credentials.

## 🚀 Tech Stack

### Frontend (Client)
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://motion.dev/) (`motion/react`), GSAP, OGL (WebGL)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Notifications:** [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Icons:** React Icons
- **Language:** TypeScript
- **Package Manager:** pnpm

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** [Express.js 5](https://expressjs.com/)
- **Database:** MongoDB with [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT + bcrypt (cookie-based sessions)
- **Email:** [EmailJS](https://www.emailjs.com/) (verification & password reset)
- **Validation:** [Zod](https://zod.dev/)
- **Language:** TypeScript
- **Package Manager:** pnpm

## 📁 Project Structure

This project uses a monorepo setup containing two main directories:

- `/client` — Next.js 16 frontend application (App Router)
- `/server` — Express.js 5 backend REST API

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### 1. Clone the repository
```bash
git clone https://github.com/hritik2004-cse/Kredo_Credential_Manager
cd Kredo_Credential_Manager
```

### 2. Backend Setup
```bash
cd server
pnpm install
```

Create a `.env` file in the `server` directory:
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET=your_jwt_access_secret
JWT_REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
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

Start the backend:
```bash
pnpm dev
```
The API runs on `http://localhost:8000` by default.

### 3. Frontend Setup
```bash
cd client
pnpm install
```

Create a `.env` file in the `client` directory:
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

Start the frontend:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Features

- **Interactive Landing Page:** A visually stunning, fully responsive landing page featuring a WebGL animated GradientWaves background, Cursor Grid, Click Spark effects, and Masked Headings.
- **Complete Authentication Flow:** Signup → Email Verification → Login. Includes resend verification, forgot password, and reset password. All secured with JWT access/refresh tokens stored in `httpOnly` cookies.
- **Email Verification:** After signup, users receive a verification link via EmailJS. The `/verify-email` page handles token validation with distinct UI states: verifying, success, error, and invalid.
- **Modern & Responsive UI:** Built with Next.js App Router and Tailwind CSS v4. Fully responsive navigation (Desktop & Mobile menus), glassmorphism cards, and spring-based micro-animations via Framer Motion.
- **Type Safety:** End-to-end TypeScript with Zod schema validation on the server for all API inputs.
