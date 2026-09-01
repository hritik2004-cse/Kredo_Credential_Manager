# Kredo Credential Manager — Backend Server

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

This is the Express.js backend server for the Kredo Credential Manager. It provides the REST API, authentication, email verification, and database services consumed by the Next.js client.

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) |
| Framework | [Express.js 5](https://expressjs.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Database | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| Validation | [Zod v4](https://zod.dev/) |
| Authentication | JWT (access + refresh tokens) + bcrypt |
| Email | [EmailJS](https://www.emailjs.com/) (verification & password reset) |
| Package Manager | pnpm |

## 🔒 Features

- **Secure Authentication:** Full local auth flow — signup, login, logout, token refresh — using JWT access tokens (short-lived) and refresh tokens (long-lived), stored in `httpOnly` cookies.
- **Email Verification:** Users must verify their email after signup. Sends a time-limited token via EmailJS; supports resend with rate limiting via token expiry.
- **Password Reset:** Forget-password flow sends a reset link via EmailJS. Validates and consumes the token on reset.
- **Account Management:** Get current user (`/me`), delete account.
- **Zod Validation Middleware:** All request bodies are validated against Zod schemas before reaching controllers.
- **Global Error Handling:** Centralized `errorHandler` middleware normalises all errors into a consistent JSON response.
- **CORS:** Configured to only allow requests from `CLIENT_URL`.

## 📁 Project Structure

```text
server/
├── src/
│   ├── config/
│   │   ├── db.config.ts          # MongoDB connection (Mongoose)
│   │   └── env.config.ts         # Validated environment variables
│   ├── constants/                # App-wide constants
│   ├── controllers/
│   │   └── auth.controller.ts    # Request handlers for all auth routes
│   ├── dto/
│   │   └── auth/                 # Zod schemas for request validation
│   │       ├── login.dto.ts
│   │       ├── signup.dto.ts
│   │       ├── verifyEmail.dto.ts
│   │       ├── resend-verification.dto.ts
│   │       ├── forgetPassword.dto.ts
│   │       └── reset-password.dto.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts     # JWT access token verification
│   │   ├── validate.middleware.ts # Zod schema validation middleware
│   │   └── error.middleware.ts    # Global error handler
│   ├── models/                    # Mongoose schemas & models
│   ├── routes/
│   │   └── auth.routes.ts         # All /api/auth/* route definitions
│   ├── services/                  # Core business logic
│   ├── types/                     # TypeScript type definitions
│   ├── utils/                     # Helper functions (token gen, email sending)
│   └── server.ts                  # App entry point (Express setup, DB connect)
├── .env                           # Environment variables (never commit)
├── .env.example                   # Example env template
├── package.json
└── tsconfig.json
```

## 🌐 API Endpoints

All auth routes are mounted at `/api/auth`.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | No | Register a new user |
| `POST` | `/api/auth/login` | No | Login and receive tokens |
| `POST` | `/api/auth/logout` | Yes | Logout and clear cookies |
| `POST` | `/api/auth/refresh` | No | Refresh the access token |
| `GET` | `/api/auth/me` | Yes | Get the current authenticated user |
| `POST` | `/api/auth/verify-email` | No | Verify email with a token |
| `POST` | `/api/auth/resend-verification` | No | Resend the verification email |
| `POST` | `/api/auth/forget-password` | No | Send a password reset email |
| `POST` | `/api/auth/reset-password` | No | Reset password with a token |
| `DELETE` | `/api/auth/delete-account` | Yes | Permanently delete the account |

## 🛠️ Getting Started

```bash
pnpm install
pnpm dev
```

The server starts on `http://localhost:<PORT>` (default `8000`).

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server with `tsx watch` (hot reload) |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run the compiled production build |

## Environment Variables

Create a `.env` file in the `server/` directory. Refer to `.env.example` for the full template.

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (e.g. `8000`) |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string |
| `BCRYPT_SALT_ROUNDS` | Bcrypt hashing rounds (e.g. `10`) |
| `JWT_ACCESS_TOKEN_SECRET` | Secret for signing JWT access tokens |
| `JWT_REFRESH_TOKEN_SECRET` | Secret for signing JWT refresh tokens |
| `JWT_ACCESS_TOKEN_EXPIRY` | Access token TTL in seconds (e.g. `900`) |
| `JWT_REFRESH_TOKEN_EXPIRY` | Refresh token TTL in seconds (e.g. `604800`) |
| `CLIENT_URL` | Frontend URL for CORS (e.g. `http://localhost:3000`) |
| `EMAIL_JS_SERVICE_ID` | EmailJS service ID |
| `EMAIL_JS_PUBLIC_KEY` | EmailJS public key |
| `EMAIL_JS_PRIVATE_KEY` | EmailJS private key |
| `EMAIL_JS_VERIFY_EMAIL_TEMPLATE` | EmailJS template ID for email verification |
| `EMAIL_JS_RESET_PASSWORD_TEMPLATE` | EmailJS template ID for password reset |
| `EMAIL_VERIFICATION_TOKEN_EXPIRY` | Verification token TTL in seconds |
| `RESET_PASSWORD_TOKEN_EXPIRY` | Reset token TTL in seconds |

> ⚠️ **Never commit `.env` to version control.** Use `.env.example` as a reference template for collaborators.
