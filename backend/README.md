# Backend Application

This is the backend application for the aipowkno project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Running with Docker](#running-with-docker)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v20 or later)
- npm (v10 or later)
- Docker (if you plan to run with Docker)
- PostgreSQL database (or a compatible database for Prisma)

## Installation

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the `backend` directory based on `.env.example`. You will need to configure your database connection string and other secrets.

Example `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
JWT_SECRET="your_jwt_secret_key"
PORT=3001
```

## Database Setup

This project uses Prisma as its ORM. You need to set up your database and run Prisma migrations.

1.  Ensure your PostgreSQL database is running and accessible via the `DATABASE_URL` in your `.env` file.

2.  Run Prisma migrations to set up your database schema:

    ```bash
    npx prisma migrate dev --name init
    ```

    (Replace `init` with a descriptive name for your migration if it's not the first one.)

3.  Generate Prisma client:

    ```bash
    npx prisma generate
    ```

## Running the Application

To run the backend in development mode:

```bash
npm run dev
```

The server will typically run on `http://localhost:4000`.

## Running with Docker

To run the backend using Docker, navigate to the root of your project (where `docker-compose.yml` is located) and use the following commands:

1.  Build the Docker image:

    ```bash
    docker-compose build backend
    ```

2.  Run the Docker container:

    ```bash
    docker-compose up backend
    ```

    Alternatively, to run all services defined in `docker-compose.yml` (including the database and frontend):

    ```bash
    docker-compose up
    ```

    The backend will be accessible at `http://localhost:4000`.
