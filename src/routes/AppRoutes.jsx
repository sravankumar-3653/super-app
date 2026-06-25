import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireCategories={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movies"
        element={
          <ProtectedRoute requireCategories={true}>
            <Movies />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;