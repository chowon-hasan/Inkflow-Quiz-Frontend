# Inkflow Quiz Frontend

This is the frontend for the Inkflow Quiz application, a web-based platform for users to take quizzes and assess their knowledge across different levels. It's built with Next.js, React, Redux, and Firebase, providing a modern and responsive user experience.

## Features

*   **User Authentication:** Secure user registration and login with email and password, including email verification.
*   **Level-Based Assessments:** A structured quiz system with multiple levels (Alpha, Sigma, Merit) that unlock progressively.
*   **Interactive Quiz Interface:** A user-friendly interface for taking quizzes with multiple-choice questions.
*   **Automated Result Calculation:** Instant feedback with score and percentage calculation to determine user's performance and progression.
*   **State Management:** Centralized state management using Redux Toolkit for a predictable and maintainable application state.
*   **Firebase Integration:** Utilizes Firebase for backend services like authentication and data storage.

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/) (v15.4.6) with Turbopack
*   **UI Library:** [React](https://reactjs.org/) (v19.1.0)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (v2.8.2) with [React Redux](https://react-redux.js.org/) and [Redux Persist](https://github.com/rt2zz/redux-persist)
*   **Backend as a Service (BaaS):** [Firebase](https://firebase.google.com/) (v12.1.0)
*   **HTTP Client:** [Axios](https://axios-http.com/) (v1.11.0)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (v5)
*   **Linting:** [ESLint](https://eslint.org/) (v9)

## Project Structure

The project is organized into the following main directories:

*   `src/app/Components`: Contains all the React components, categorized by feature (e.g., `Homepage`, `Login_SignUp`).
*   `src/app/Hooks`: Houses custom React hooks that encapsulate business logic for features like authentication, data fetching, and form submissions.
*   `src/app/lib`: Includes the Firebase configuration and initialization.
*   `src/app/Redux_Store`: Manages the application's state with Redux Toolkit, including the store and slices.
*   `src/app/assessment`: Contains the dynamic pages for the quiz and the result display.
*   `public`: Stores static assets, such as the `Qustions.json` file which contains the quiz questions.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/inkflow-quiz-frontend.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd inkflow-quiz-frontend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1.  Create a `.env.local` file in the root of the project and add your Firebase configuration:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
    NEXT_PUBLIC_SERVER_URL=your_backend_server_url
    ```
2.  Start the development server:
    ```sh
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

*   `npm run dev`: Starts the development server with Turbopack.
*   `npm run build`: Creates a production-ready build of the application.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs the ESLint linter to check for code quality and style issues.
