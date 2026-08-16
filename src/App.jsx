import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Users from "./pages/Users";
import DashboardLayout from "./layouts/DashboardLayout";
import RoverManagement from "./pages/RoverManagement";
import Tasks from "./pages/Tasks";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
  <Route
  path="/tasks"
  element={
    <ProtectedRoute permission="tasks">
      <DashboardLayout>
        <Tasks />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
        <Route
  path="/rover"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <RoverManagement />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        <Route
  path="/users"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Users />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;