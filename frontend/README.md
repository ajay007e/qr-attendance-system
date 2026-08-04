# Frontend

The frontend for the **QR Attendance System**, built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Technology Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Axios

## Project Structure

```text
app/            Next.js App Router pages and layouts
features/       Feature-based modules
shared/         Shared components, hooks, utilities, and providers
```

## Getting Started

### Install dependencies

Using npm

```bash
npm install
```

Using pnpm

```bash
pnpm install
```

### Configure Environment

Create a local environment file.

```bash
cp .env.example .env.local
```

Update the required environment variables before starting the application.

### Start Development Server

Using npm

```bash
npm run dev
```

Using pnpm

```bash
pnpm run dev
```

The application will be available at

```text
http://localhost:3000
```

## Build

Using npm

```bash
npm run build
```

Using pnpm

```bash
pnpm build
```

## Code Organization

### App Router

The `app/` directory contains pages, layouts, and route groups.

```text
app/
├── (auth)
├── (dashboard)
└── layout.tsx
```

### Features

Each business feature is self-contained.

```text
features/
├── auth/
├── users/
└── ...
```

A feature may contain:

- API services
- Components
- Hooks
- Types
- Context
- Utilities

### Shared

Reusable code that can be used across multiple features.

```text
shared/
├── components/
├── hooks/
├── providers/
├── lib/
└── types/
```

## Development Guidelines

- Follow the existing project structure.
- Keep feature-specific code inside the corresponding `features` module.
- Reuse components from `shared` whenever possible.
- Avoid duplicating business logic.
- Keep components focused on a single responsibility.
- Place API requests inside feature service files.
- Follow existing naming conventions throughout the project.

## Before Committing

Verify that:

- The application builds successfully.
- The feature works as expected.
- There are no TypeScript errors.
- There are no unnecessary files in the commit.
- Environment files are not committed.

## Related Documentation

Refer to the repository root [README.md](../README.md) for:

- Full project setup
- Backend setup
- Development workflow
- Branching strategy
- Pull request process
