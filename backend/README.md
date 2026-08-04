# Backend

This directory contains the REST API for the **QR Attendance System**. It is built with **Node.js**, **Express.js**, and **TypeScript**, and provides authentication, user management, course management, attendance management, and other backend services.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- MySQL

## Project Structure

```text
src/
├── api/
│   └── v1/
│       ├── modules/
│       └── v1.routes.ts
├── config/
├── middleware/
├── types/
├── utils/
├── app.ts
├── routes.ts
└── server.ts
```

### Modules

Each module follows the same structure.

```text
module/
├── module.controller.ts
├── module.service.ts
├── module.repository.ts
├── module.routes.ts
├── module.types.ts
└── index.ts
```

| File       | Responsibility                      |
| ---------- | ----------------------------------- |
| controller | Handles HTTP requests and responses |
| service    | Contains business logic             |
| repository | Database access                     |
| routes     | API route definitions               |
| types      | Module-specific TypeScript types    |
| index      | Module exports                      |

# Getting Started

## Install Dependencies

Using npm

```bash
npm install
```

Using pnpm

```bash
pnpm install
```

## Configure Environment

Create a local environment file.

```bash
cp .env.example .env
```

Update the required configuration values.

## Database Setup

Follow the instructions in: [DATABASE.md](../docs/DATABASE.md)

## Bootstrap the Super Administrator

After the database has been created, create the initial Super Administrator account.

See: [BOOTSTRAP.md](../docs/BOOTSTRAP.md)

## Start the Development Server

Using npm

```bash
npm run dev
```

Using pnpm

```bash
pnpm run dev
```

The server port is configured through the environment variables.

# Adding a New Module

Every feature should be implemented as a separate module.

Example

```text
src/api/v1/modules/

attendance/

notification/

reports/
```

Each module should contain:

- Controller
- Service
- Repository
- Routes
- Types
- Index

Register the routes in:

```text
src/api/v1/v1.routes.ts
```

# Development Guidelines

- Follow the existing module structure.
- Keep controllers lightweight.
- Place business logic inside services.
- Database queries belong in repositories.
- Keep validation close to the module.
- Avoid duplicating code.
- Reuse utilities whenever possible.

# Before Committing

Verify that:

- The project compiles successfully.
- The server starts without errors.
- The feature has been tested locally.
- No generated files are committed.
- Environment files are not committed.

# Pull Requests

Every change must be submitted through a Pull Request.

Include:

- Summary of changes
- Related GitHub Issue
- Testing performed
- Breaking changes (if any)

Only the repository owner will review and merge Pull Requests.

# Useful Commands

Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

Run development server

```bash
npm run dev
```

or

```bash
pnpm run dev
```

Build

```bash
npm run build
```

or

```bash
pnpm build
```

# Additional Documentation

For project setup and onboarding, refer to:

- [README.md](../README.md)
- [DATABASE.md](../docs/DATABASE.md)
- [BOOTSTRAP.md](../docs/BOOTSTRAP.md)
- [DOCKER.md](../docs/DOCKER.md)
