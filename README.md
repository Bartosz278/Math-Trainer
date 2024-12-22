# Math Trainer
# [https://math-trainer.netlify.app/](https://math-training-center.netlify.app/)

Math Trainer is a web application designed to help users improve their math skills through interactive exercises and challenges. The application offers a user-friendly interface and various features to make learning math engaging and efficient.

## Technologies

The project is built using the following technologies and tools:

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **React Router DOM**: For client-side routing.
  - **React Icons**: A library for incorporating vector icons.
  - **React Toastify**: For notifications and toasts.
  - **React Spinners**: For loading indicators.
  - **Axios**: A promise-based HTTP client for handling API calls.
  - **Prop-Types**: Runtime type checking for React props.
  - **Tailwind CSS**: A utility-first CSS framework for styling.
  - **PostCSS**: A tool for transforming styles with plugins.
  - **Tailwind Scrollbar**: A plugin for styling scrollbars in Tailwind CSS.
  - **ESLint**: A tool for identifying and fixing JavaScript code issues.
  - **Node Fetch**: A lightweight HTTP request library.
  - **Vite**: A fast and modern build tool.

- **Backend**:
  - **Java Spring Boot**: Developed by contributors, providing the server-side logic and APIs.

## Project Structure

- **`index.html`**: The main HTML file, serving as the entry point of the application.
- **`src/`**: Contains the main source code, organized as follows:
  - **`components/`**: Reusable React components.
  - **`context/`**: State management logic using React Context API.
  - **`helpers/`**: Utility functions supporting application logic.
  - **`hooks/`**: Custom React hooks for modular functionality.
  - **`pages/`**: Application pages and routes.
  - **`services/`**: Modules for interacting with external APIs or services (using Axios).
- **`public/`**: Assets such as images or icons, directly accessible by the browser.
- **`package.json`**: Project configuration and dependencies.
- **`vite.config.js`**: Configuration for Vite to build and serve the application.
- **`.eslintrc.*`**: ESLint configuration for maintaining code quality.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Bartosz278/Math-Trainer.git
   cd Math-Trainer
   git checkout frontend
   npm install
   npm run dev

