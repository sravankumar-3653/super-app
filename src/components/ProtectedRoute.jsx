import { Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const ProtectedRoute = ({ children, requireCategories = false }) => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);

  const isUserRegistered =
    user?.name?.trim() &&
    user?.username?.trim() &&
    user?.email?.trim() &&
    user?.mobile?.trim();

  if (!isUserRegistered) {
    return <Navigate to="/" replace />;
  }

  if (requireCategories && (!categories || categories.length < 3)) {
    return <Navigate to="/categories" replace />;
  }

  return children;
};

export default ProtectedRoute;