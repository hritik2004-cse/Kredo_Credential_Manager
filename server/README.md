# Kredo Credential Manager - Backend Server

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

This is the backend server for the Kredo Credential Manager project. It provides the core API services, authentication, and database interaction required by the application.

## Features
- **Secure Authentication**: Implemented user login and signup with JSON Web Tokens (JWT) and email verification.
- **Session Management**: Securely handles sessions using `httpOnly` cookies for Access and Refresh tokens.
- **Validation**: Schema-based data validation using Zod to ensure type safety on requests.
- **CORS Support**: Configured securely to communicate with the Next.js frontend client.

## Tech Stack

The server is built using a modern Node.js stack with TypeScript:
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database ORM:** [Mongoose](https://mongoosejs.com/) (MongoDB)
- **Validation:** [Zod](https://zod.dev/)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Middleware & Utilities:** `cookie-parser` (for parsing cookies), `cors` (Cross-Origin Resource Sharing), `dotenv` (Environment variables)

## Project Structure

The source code is organized within the `src` directory following a layered architecture:

```text
server/
├── src/
│   ├── config/       # Configuration setup & env vars
│   ├── constants/    # Hardcoded values and constants
│   ├── controllers/  # Request handlers
│   ├── dto/          # Data Transfer Objects (Zod schemas)
│   ├── middleware/   # Express middleware
│   ├── models/       # Mongoose schemas & DB models
│   ├── routes/       # API endpoint definitions
│   ├── services/     # Core business logic
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Helper functions
│   └── server.ts     # Application entry point
├── .env              # Environment variables
├── package.json      # Project dependencies & scripts
└── tsconfig.json     # TypeScript configuration
```

## Development

The project uses `pnpm` as the package manager.

### Available Scripts

- **Development:** `pnpm dev` - Starts the development server using `tsx` in watch mode.
- **Build:** `pnpm build` - Compiles the TypeScript source code to JavaScript in the `dist` directory.
- **Start:** `pnpm start` - Runs the compiled output for production.

## Environment Variables

The server requires certain environment variables to function correctly. A `.env` file must be present in the root of the `server` directory. *(Note: The `.env` file should never be committed to version control to protect sensitive information).*

### Required Variables:
- `PORT`: Port on which the server will run (e.g., `8000`)
- `NODE_ENV`: Environment mode (`development` or `production`)
- `MONGODB_URI`: Connection string for the MongoDB database
- `BCRYPT_SALT_ROUNDS`: Number of rounds for password hashing
- `JWT_ACCESS_TOKEN_SECRET`: Secret key for signing JWT access tokens
- `JWT_REFRESH_TOKEN_SECRET`: Secret key for signing JWT refresh tokens
- `CLIENT_URL`: The URL of the frontend application (used for CORS and redirects, e.g., `http://localhost:3000`)
- `JWT_ACCESS_TOKEN_EXPIRY`: Expiry time in seconds for the access token
- `JWT_REFRESH_TOKEN_EXPIRY`: Expiry time in seconds for the refresh token
- `EMAIL_JS_SERVICE_ID`: EmailJS Service ID for sending emails
- `EMAIL_JS_PUBLIC_KEY`: EmailJS Public Key
- `EMAIL_JS_PRIVATE_KEY`: EmailJS Private Key
- `EMAIL_JS_VERIFY_EMAIL_TEMPLATE`: EmailJS template ID for email verification
- `EMAIL_JS_RESET_PASSWORD_TEMPLATE`: EmailJS template ID for password reset
- `EMAIL_VERIFICATION_TOKEN_EXPIRY`: Expiry time in seconds for email verification token
- `RESET_PASSWORD_TOKEN_EXPIRY`: Expiry time in seconds for password reset token
