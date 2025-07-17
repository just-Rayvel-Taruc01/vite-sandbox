import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
    <Helmet>
        <title>Home | vite-sandbox</title>
        <link rel="icon" href="/favicon-home.ico" />
        <meta name="description" content="Welcome to the React Vite Sandbox!" />
    </Helmet>

    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple home component for our application.</p>
    </div>
    </>
  );
}