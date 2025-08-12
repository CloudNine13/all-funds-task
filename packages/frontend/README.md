# Frontend Application

This project is a single-page React application designed to showcase frontend development skills by interacting with a backend API to manage news articles.

## Description

The application serves as a user interface for managing news articles. It fetches, displays, and allows for the manipulation of news articles, including archiving and unarchiving them. The main features include:

*   **Displaying News Articles:** Fetches and presents a list of news articles.
*   **Archiving Functionality:** Users can archive articles, moving them from the active list to an archived section.
*   **Unarchiving Functionality:** Archived articles can be restored to the active list.
*   **Modal Interactions:** Utilizes modals for user interactions, such as adding new articles, confirming actions, and displaying information.
*   **Pagination:** Supports pagination for navigating through large sets of news articles.

## Essential Libraries

This project leverages a modern frontend stack to deliver a robust and responsive user experience:

*   **React (with React DOM):** The core library for building the user interface, enabling a component-based architecture.
*   **React Router DOM:** Manages client-side routing, allowing for navigation between different views without full page reloads.
*   **Axios:** A promise-based HTTP client used for making requests to the backend API, facilitating data fetching and submission.
*   **Formik:** A popular library for building forms in React, simplifying form state management, validation, and submission.
*   **Material-UI (`@mui/material`, `@mui/icons-material`):** A comprehensive React UI framework that implements Google's Material Design. It provides a wide range of pre-built, customizable UI components and icons, ensuring a consistent and aesthetically pleasing design.
*   **Emotion (`@emotion/react`, `@emotion/styled`):** A high-performance CSS-in-JS library used for styling React components. It allows for writing CSS directly within JavaScript, enabling dynamic and component-scoped styles.
*   **Vite:** A next-generation frontend tooling that provides an extremely fast development experience. It serves as the build tool, development server, and handles hot module replacement.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript. It enhances code quality, readability, and maintainability by catching errors during development.
*   **@vitejs/plugin-react-swc:** A Vite plugin that provides React support with SWC (Speedy Web Compiler) for extremely fast HMR (Hot Module Replacement) and build times.
*   **vite-tsconfig-paths:** A Vite plugin that enables TypeScript path mapping support, allowing for cleaner import paths.

## Development and Testing Tools

*   **ESLint & Prettier:** Tools for static code analysis and code formatting, ensuring consistent code quality and style across the project.

## How to Start the Frontend Application

To get the frontend application up and running on your local machine, follow these steps:

1.  **Navigate to the Frontend Directory:**
    Open your terminal or command prompt and change your current directory to the `frontend` folder within the project:
    ```bash
    cd packages/frontend
    ```

2.  **Install Dependencies:**
    Install all the necessary project dependencies. This project uses `bun` as the package manager, but `npm` or `yarn` can also be used.
    ```bash
    bun install
    # or
    # npm install
    # or
    # yarn install
    ```

3.  **Start the Development Server:**
    Once the dependencies are installed, you can start the development server. This will compile the application and open it in your default web browser, typically at `http://localhost:5173`.
    ```bash
    bun run dev
    # or
    # npm run dev
    # or
    # yarn dev
    ```

    The application will now be running and accessible in your browser. Any changes you make to the source code will trigger a hot reload, updating the application in real-time.

4.  **Build for Production (Optional):**
    If you wish to create a production-ready build of the application, you can use the build command:
    ```bash
    bun run build
    # or
    # npm run build
    # or
    # yarn build
    ```
    This will generate optimized static assets in the `dist` directory, which can then be deployed to a web server.

Make sure your backend server is also running to ensure the frontend can fetch and interact with the news article data.