import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requireAuth }) => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const loading = status === "loading";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto rounded-full border-4 border-transparent border-t-[4px] animate-spin bg-gradient-to-br from-violet-500 to-fuchsia-500 [mask-image:linear-gradient(white,white)]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
