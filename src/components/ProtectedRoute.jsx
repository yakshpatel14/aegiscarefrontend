import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, permission, requiredRole }) {
  const { isAuthenticated, user, hasPermission, isAdminPreview } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role === "admin" && isAdminPreview) {
      return children;
    }

    const destination = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    return <Navigate to={destination} replace />;
  }

  if (permission && !hasPermission(permission)) {
    if (user?.role === "admin" && isAdminPreview) {
      return children;
    }

    const destination = user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
    return <Navigate to={destination} replace />;
  }

  return children;
}

export default ProtectedRoute;