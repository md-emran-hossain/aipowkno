# Frontend Application

This is the frontend application for the aipowkno project, built with Next.js.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running with Docker](#running-with-docker)

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   Node.js (v20 or later)
*   npm (v10 or later)
*   Docker (if you plan to run with Docker)

## Installation

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the `frontend` directory based on `.env.example`. You will need to configure the backend API URL.

Example `.env`:

```
NEXT_PUBLIC_BACKEND_URL="http://localhost:4000"
```

## Running the Application

To run the frontend in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with Docker

To run the frontend using Docker, navigate to the root of your project (where `docker-compose.yml` is located) and use the following commands:

1.  Build the Docker image:

    ```bash
    docker-compose build frontend
    ```

2.  Run the Docker container:

    ```bash
    docker-compose up frontend
    ```

    Alternatively, to run all services defined in `docker-compose.yml` (including the backend and database):

    ```bash
    docker-compose up
    ```

    The frontend will be accessible at `http://localhost:3000`.