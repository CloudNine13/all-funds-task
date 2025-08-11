# AllFunds Company Task Monorepo

This repository contains the source code for the AllFunds company task. It's a monorepo that includes both a frontend and a backend project, located in the `packages` directory.

## Getting Started

To get the entire project up and running, you will need to start both the frontend and backend applications.

### Prerequisites

*   [Node.js](https://nodejs.org/)
*   [Bun](https://bun.sh/) (or npm/yarn)
*   [MongoDB](https://www.mongodb.com/)
*   [Docker](https://www.docker.com/)

### Installation and Running (Manual)

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd all-funds-task
    ```

2.  **Install dependencies for both projects:**

    ```bash
    # From the root directory
    cd packages/frontend && bun install && cd ../../ # or npm install or yarn install
    cd packages/backend && bun install && cd ../../ # or npm install or yarn install
    ```

3.  **Set up the backend environment:**

    Create a `.env.local` file in the `packages/backend` directory and add your environment variables, such as your MongoDB connection string. A typical `.env.local` file might look like this:

    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/news_db
    ```

4.  **Start the backend server:**

    ```bash
    cd packages/backend
    bun run dev
    ```

5.  **Start the frontend application:**

    In a new terminal, navigate to the frontend directory and start the development server:

    ```bash
    cd packages/frontend
    bun run dev
    ```

    The frontend application should now be running at `http://localhost:5173` and connected to the backend server.

### Running with Docker

1.  **Build and start the containers:**

    ```bash
    docker compose up -d --build
    ```

2.  **Access the application:**

    The frontend application will be available at `http://localhost:3000`.

## Projects

### [Frontend](./packages/frontend)

A single-page React application designed to showcase frontend development skills by interacting with a backend API to manage news articles.

### [Backend](./packages/backend)

A Node.js backend application built with Express.js, designed to provide a RESTful API for managing news articles. It interacts with a MongoDB database to store and retrieve article data.

## Technologies

### Frontend

*   **React (with React DOM)**
*   **React Router DOM**
*   **Axios**
*   **Formik**
*   **Material-UI (`@mui/material`, `@mui/icons-material`)**
*   **Emotion (`@emotion/react`, `@emotion/styled`)**
*   **Vite**
*   **TypeScript**

### Backend

*   **Express.js**
*   **Mongoose**
*   **Dotenv**
*   **CORS**
*   **Helmet**
*   **Winston**
*   **Morgan**
*   **Nodemon**
*   **TypeScript**