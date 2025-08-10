import React from 'react';

const ReadmePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 border-b border-gray-700 pb-4">Inkflow Quiz Frontend</h1>
        <p className="text-lg mb-6">This is the frontend for the Inkflow Quiz application, a web-based platform for users to take quizzes and assess their knowledge across different levels. It's built with Next.js, React, Redux, and Firebase, providing a modern and responsive user experience.</p>

        <h2 className="text-3xl font-bold mb-4 mt-8 border-b border-gray-700 pb-2">Features</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li><strong>User Authentication:</strong> Secure user registration and login with email and password, including email verification.</li>
          <li><strong>Level-Based Assessments:</strong> A structured quiz system with multiple levels (Alpha, Sigma, Merit) that unlock progressively.</li>
          <li><strong>Interactive Quiz Interface:</strong> A user-friendly interface for taking quizzes with multiple-choice questions.</li>
          <li><strong>Automated Result Calculation:</strong> Instant feedback with score and percentage calculation to determine user's performance and progression.</li>
          <li><strong>State Management:</strong> Centralized state management using Redux Toolkit for a predictable and maintainable application state.</li>
          <li><strong>Firebase Integration:</strong> Utilizes Firebase for backend services like authentication and data storage.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4 mt-8 border-b border-gray-700 pb-2">Technologies Used</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li><strong>Framework:</strong> <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Next.js</a> (v15.4.6) with Turbopack</li>
          <li><strong>UI Library:</strong> <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">React</a> (v19.1.0)</li>
          <li><strong>State Management:</strong> <a href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Redux Toolkit</a> (v2.8.2) with <a href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">React Redux</a> and <a href="https://github.com/rt2zz/redux-persist" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Redux Persist</a></li>
          <li><strong>Backend as a Service (BaaS):</strong> <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Firebase</a> (v12.1.0)</li>
          <li><strong>HTTP Client:</strong> <a href="https://axios-http.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Axios</a> (v1.11.0)</li>
          <li><strong>Styling:</strong> <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Tailwind CSS</a> (v4)</li>
          <li><strong>Language:</strong> <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">TypeScript</a> (v5)</li>
          <li><strong>Linting:</strong> <a href="https://eslint.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">ESLint</a> (v9)</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4 mt-8 border-b border-gray-700 pb-2">Project Structure</h2>
        <p className="mb-6">The project is organized into the following main directories:</p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li><code>src/app/Components</code>: Contains all the React components, categorized by feature (e.g., <code>Homepage</code>, <code>Login_SignUp</code>).</li>
          <li><code>src/app/Hooks</code>: Houses custom React hooks that encapsulate business logic for features like authentication, data fetching, and form submissions.</li>
          <li><code>src/app/lib</code>: Includes the Firebase configuration and initialization.</li>
          <li><code>src/app/Redux_Store</code>: Manages the application's state with Redux Toolkit, including the store and slices.</li>
          <li><code>src/app/assessment</code>: Contains the dynamic pages for the quiz and the result display.</li>
          <li><code>public</code>: Stores static assets, such as the <code>Qustions.json</code> file which contains the quiz questions.</li>
        </ul>

        <h2 className="text-3xl font-bold mb-4 mt-8 border-b border-gray-700 pb-2">Getting Started</h2>
        <p className="mb-6">To get a local copy up and running, follow these simple steps.</p>

        <h3 className="text-2xl font-bold mb-3 mt-6">Prerequisites</h3>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Node.js (v18 or later)</li>
          <li>npm, yarn, or pnpm</li>
        </ul>

        <h3 className="text-2xl font-bold mb-3 mt-6">Installation</h3>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          <li>Clone the repository:
            <pre className="bg-gray-800 p-4 rounded-md mt-2 text-sm"><code>git clone https://github.com/your-username/inkflow-quiz-frontend.git</code></pre>
          </li>
          <li>Navigate to the project directory:
            <pre className="bg-gray-800 p-4 rounded-md mt-2 text-sm"><code>cd inkflow-quiz-frontend</code></pre>
          </li>
          <li>Install the dependencies:
            <pre className="bg-gray-800 p-4 rounded-md mt-2 text-sm"><code>npm install</code></pre>
          </li>
        </ol>

        <h3 className="text-2xl font-bold mb-3 mt-6">Running the Application</h3>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          <li>Create a <code>.env.local</code> file in the root of the project and add your Firebase configuration:
            <pre className="bg-gray-800 p-4 rounded-md mt-2 text-sm"><code>
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_SERVER_URL=your_backend_server_url
            </code></pre>
          </li>
          <li>Start the development server:
            <pre className="bg-gray-800 p-4 rounded-md mt-2 text-sm"><code>npm run dev</code></pre>
          </li>
          <li>Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">http://localhost:3000</a> with your browser to see the result.</li>
        </ol>

        <h2 className="text-3xl font-bold mb-4 mt-8 border-b border-gray-700 pb-2">Available Scripts</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li><code>npm run dev</code>: Starts the development server with Turbopack.</li>
          <li><code>npm run build</code>: Creates a production-ready build of the application.</li>
          <li><code>npm run start</code>: Starts the production server.</li>
          <li><code>npm run lint</code>: Runs the ESLint linter to check for code quality and style issues.</li>
        </ul>
      </div>
    </div>
  );
};

export default ReadmePage;
