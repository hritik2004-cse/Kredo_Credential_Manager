# Kredo Credential Manager — Frontend Client

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

This is the Next.js 16 frontend client for the **Kredo Credential Manager** project.

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) — App Router |
| UI Library | React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://motion.dev/) (`motion/react`), GSAP, OGL (WebGL) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Notifications | [React Toastify](https://fkhadra.github.io/react-toastify/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Language | TypeScript |
| Package Manager | pnpm |

## 🔒 Features

- **Interactive Landing Page:** WebGL animated `GradientWaves` background with mouse interaction, Cursor Grid, Click Spark effects, and Masked Heading animations.
- **Signup Page:** Glassmorphism card with username, email, password fields, terms acceptance, and Framer Motion spring animations. On success, transitions to an email-sent confirmation screen with resend support and cooldown timer.
- **Email Verification Page:** Handles the `/verify-email?token=...` route. Displays four distinct animated states — `verifying`, `success`, `error`, and `invalid` — with GIF illustrations and appropriate action buttons.
- **Responsive Navigation:** Desktop and Mobile menus with side drawer, `LinkButton` with glassmorphism variant.
- **Reusable Component System:** `Button`, `LinkButton`, `FormInput`, `Field`, `Label`, `Logo` — all built with consistent design tokens and Framer Motion animations.

## 📁 Project Structure

```text
client/
├── public/
│   └── status/             # GIF assets for verification states (loading, success, error)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout (ToastContainer, fonts)
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Login page
│   │   ├── signup/         # Signup + email-sent state (VerificationEmailSent component)
│   │   └── verify-email/   # Email verification page (4 states)
│   ├── components/
│   │   ├── GradientWaves.jsx      # WebGL animated background (OGL-based)
│   │   ├── AnimatedContent.jsx    # Scroll animation wrapper
│   │   ├── ClickSpark.jsx         # Click spark effect
│   │   ├── CursorGrid.jsx         # Interactive cursor grid
│   │   ├── MaskedHeading.jsx      # Masked text heading animation
│   │   ├── main/                  # Page-level components (HeroSection, Features, NavBar)
│   │   ├── ui/                    # Base UI primitives (Checkbox)
│   │   └── utility/               # Reusable utility components
│   │       ├── Button.tsx         # Animated button (primary / secondary / delete variants)
│   │       ├── LinkButton.tsx     # Animated Next.js Link button
│   │       ├── FormInput.tsx      # Icon-prefixed form input
│   │       ├── Field.tsx          # Form field layout wrapper
│   │       ├── Label.tsx          # Accessible form label
│   │       ├── Input.tsx          # Base input primitive
│   │       └── Logo.tsx           # Brand logo (xs / sm / md sizes)
│   ├── config/
│   │   └── env.config.ts          # Validated env config (NEXT_PUBLIC_SERVER_URL)
│   ├── data/                      # Static data constants (nav links, etc.)
│   ├── lib/
│   │   └── axios.ts               # Axios instance with base URL + credentials
│   └── types/
│       └── form.types.ts          # TypeScript types (SignupFormCredentials, etc.)
├── components.json            # shadcn/ui configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript configuration
```

## 🛠️ Getting Started

Make sure the backend server is running first, then:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the `client/` directory:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SERVER_URL` | Base URL of the Express backend API |

> **Note:** The `NEXT_PUBLIC_` prefix is required by Next.js to expose the variable to the browser bundle.

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the production bundle |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://motion.dev/docs)
