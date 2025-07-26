# AI-Powered Knowledge Management (aipowkno)

This repository contains a full-stack application for AI-powered knowledge management, consisting of a Next.js frontend and a Node.js backend with Prisma and PostgreSQL.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Local Setup (Without Docker)](#local-setup-without-docker)
  - [Running with Docker Compose (Recommended)](#running-with-docker-compose-recommended)
- [Project Structure](#project-structure)

## Project Overview

This application aims to provide a robust platform for managing knowledge, with features such as article creation, filtering, and AI-powered summarization.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: Version 20 or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm**: Version 10 or higher (comes with Node.js).
*   **Docker & Docker Compose**: Essential for easily running the entire application stack. Download from [docker.com](https://www.docker.com/get-started).
*   **PostgreSQL**: While Docker Compose will set up a PostgreSQL container, you might need a local installation for development purposes or direct database interaction.

## Getting Started

There are two primary ways to get this project up and running:

### Local Setup (Without Docker)

If you prefer to run the frontend and backend services directly on your machine without Docker Compose, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/md-emran-hossain/aipowkno.git
    cd aipowkno
    ```

2.  **Backend Setup:**

    Navigate to the `backend` directory and follow the instructions in its `README.md`:

    ```bash
    cd backend
    # Follow instructions in backend/README.md for installation, environment variables, and database setup
    npm install
    # Create .env file
    npx prisma migrate dev
    npx prisma generate
    npm run dev
    ```

3.  **Frontend Setup:**

    Open a new terminal, navigate to the `frontend` directory, and follow the instructions in its `README.md`:

    ```bash
    cd frontend
    # Follow instructions in frontend/README.md for installation and environment variables
    npm install
    npm run dev
    ```

### Running with Docker Compose (Recommended)

This is the easiest way to get the entire application stack (backend, frontend, and database) running.

1.  **Clone the repository (if you haven't already):**

    ```bash
    git clone https://github.com/md-emran-hossain/aipowkno.git
    cd aipowkno
    ```

2.  **Build and run the services:**

    From the root directory of the project, execute:

    ```bash
    docker-compose up --build
    ```

    This command will:
    *   Build the Docker images for both the `backend` and `frontend` services.
    *   Start the PostgreSQL database container.
    *   Start the backend service (accessible on port `4000`).
    *   Start the frontend service (accessible on port `3000`).

    The frontend application will be available at `http://localhost:3000`.

3.  **Stopping the services:**

    To stop all running containers, press `Ctrl+C` in the terminal where `docker-compose up` is running. To remove the containers and networks, use:

    ```bash
    docker-compose down
    ```

## Project Structure

```
aipowkno/
├── backend/             # Node.js Express backend with Prisma
│   ├── src/             # Backend source code
│   ├── Dockerfile       # Dockerfile for backend
│   └── README.md        # Backend specific README
├── frontend/            # Next.js frontend application
│   ├── src/             # Frontend source code
│   ├── Dockerfile       # Dockerfile for frontend
│   └── README.md        # Frontend specific README
├── docker-compose.yml   # Docker Compose configuration for the entire stack
└── README.md            # Project overview README (this file)
```
