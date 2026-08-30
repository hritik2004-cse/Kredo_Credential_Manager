# Kredo Credential Manager - Frontend Client

This is the Next.js frontend client for the **Kredo Credential Manager** project.

## 🚀 Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Fonts:** Custom fonts using `next/font` (Inter and JetBrains Mono)
- **Icons:** React Icons & Custom SVG/PNG Icons
- **UI & Animations:** Custom animated components (Click Spark, Cursor Grid, Masked Headings) and fully responsive layouts

## 🔒 Features
- **Interactive Landing Page:** Features a modern hero section, interactive cursor grid, click spark effects, and masked headings to create a dynamic user experience.
- **Authentication Pages:** Beautifully designed, intuitive login and signup pages.
- **Responsive Navigation:** Desktop and mobile navigation menus with side drawers for seamless access across devices.

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

```text
client/
├── public/         # Static assets and icons
├── src/
│   ├── app/        # Next.js App Router pages, layouts, and global styles
│   ├── components/ # Reusable UI components & Animated components
│   │   ├── main/   # Core page components (e.g., HeroSection, Features)
│   │   ├── ui/     # Base UI elements (e.g., Drawer, Button)
│   │   └── utility/# Utility components (e.g., Logo, Navigation)
│   ├── data/       # Static data constants (e.g., navigation links)
│   └── lib/        # Utility functions and helpers
├── components.json # shadcn/ui configuration
├── next.config.ts  # Next.js configuration
├── package.json    # Project dependencies & scripts
└── tailwind.config.ts # Tailwind CSS configuration
```

## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
