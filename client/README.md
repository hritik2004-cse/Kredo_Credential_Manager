# Kredo Credential Manager - Frontend Client

This is the Next.js frontend client for the **Kredo Credential Manager** project.

## 🚀 Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Fonts:** Custom fonts using `next/font` (Inter and JetBrains Mono)
- **Icons:** React Icons & Custom SVG/PNG Icons

## 🛠️ Getting Started

First, ensure you have the required `.env` file set up (if applicable) and that the backend server is running, as the client needs to connect to the API.

Install the dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Environment Variables

The client requires a `.env` file to communicate with the backend server. Create a `.env` file in the root of the `client` directory:

```env
SERVER_URL=http://localhost:8000
```
- `SERVER_URL`: The base URL where your Express backend API is running.

## 📁 Project Structure
The source code is located in the `src` directory:
- `app/` - Next.js App Router pages, layouts, and global styles.
- `public/` - Static assets and icons.

## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
