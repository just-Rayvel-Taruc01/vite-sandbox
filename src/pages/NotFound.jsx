import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 | Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-900 text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
        >
          Go Home
        </Link>
      </div>
    </>
  );
}
