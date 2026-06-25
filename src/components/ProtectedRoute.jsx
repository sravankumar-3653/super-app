import { Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const ProtectedRoute = ({ children, requireCategories = false }) => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.selectedCategories);

  const isUserFilled =
    user?.name && user?.username && user?.email && user?.mobile;

  if (!isUserFilled) {
    return <Navigate to="/" replace />;
  }

  if (requireCategories && (!selectedCategories || selectedCategories.length < 3)) {
    return <Navigate to="/categories" replace />;
  }

  return children;
};

export default ProtectedRoute;