import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
    <Helmet>
        <title>Home | vite-sandbox</title>
        <link rel="icon" href="/favicon-home.ico" />
        <meta name="description" content="Welcome to the React Vite Sandbox!" />
    </Helmet>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the React Vite Sandbox!</h1>
      <p className="text-lg mb-8">This is a simple home page for your Vite project.</p>
      <img src="/vite-logo.svg" alt="Vite Logo" className="w-32 h-32 mb-4" />
      <p className="text-sm text-gray-600">Explore the project and enjoy coding!</p>
      <p className="text-sm text-gray-600 mt-4">This project is built with Vite, React, and Tailwind CSS.</p>
    </div>
    </>
  );
}