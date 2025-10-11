import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500">
      <h1 className="text-9xl font-extrabold text-white mb-4 animate-pulse">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-100 mb-8 max-w-md">
        The page you are looking for does not exist, may have been moved, or is
        temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-sky-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
