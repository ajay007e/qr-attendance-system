# QR Attendance System

A QR Code-based attendance management system for educational institutions. The system provides role-based access for Administrators, Lecturers, and Students to manage courses, record attendance using QR codes, and generate attendance reports.

## Repository

```text
https://github.com/ajay007e/qr-attendance-system
```

## Technology Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MySQL

## Project Structure

```text
.
├── frontend/      # Next.js application
├── backend/       # Express.js REST API
├── docs/          # Project documentation
├── README.md
```

# Prerequisites

Install the following before getting started.

- Node.js (LTS)
- Git
- npm or pnpm
- MySQL or Docker

# Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/ajay007e/qr-attendance-system.git

cd qr-attendance-system
```

## 2. Database Setup

Choose one of the following options.

### Option A (Recommended)

Run MySQL using Docker.

See: [DOCKER.md](docs/DOCKER.md)

### Option B

Use a local MySQL installation.

See: [DATABASE.md](docs/DATABASE.md)

## 3. Bootstrap the Application

Create the initial Super Administrator account.

See: [BOOTSTRAP.md](docs/BOOTSTRAP.md)

## 4. Backend Setup

```bash
cd backend
```

Install dependencies.

Using npm

```bash
npm install
```

Using pnpm

```bash
pnpm install
```

Create a local environment file.

```bash
cp .env.example .env
```

Start the backend.

```bash
npm run dev
```

or

```bash
pnpm run dev
```

## 5. Frontend Setup

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

or

```bash
pnpm install
```

Create a local environment file.

```bash
cp .env.example .env.local
```

Start the frontend.

```bash
npm run dev
```

or

```bash
pnpm run dev
```

The frontend runs on:

```text
http://localhost:3000
```

# Documentation

Additional project documentation is available in the `docs` directory.

- Database Setup ([DATABASE.md](docs/DATABASE.md))
- Docker Setup ([DOCKER.md](docs/DOCKER.md))
- Bootstrap Super Administrator ([BOOTSTRAP.md](docs/BOOTSTRAP.md))

# Contributing

Please read: [CONTRIBUTING.md](docs/CONTRIBUTING.md)

before creating a branch or submitting a Pull Request.

# License

This project is licensed under the [MIT License](LICENSE).
