import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import Login from "./pages/login";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersDatabase from "./pages/AdminUsersDatabase";
import AdminUserDetail from "./pages/AdminUserDetail";
import AdminFleet from "./pages/AdminFleet";
import AdminServerMonitor from "./pages/AdminServerMonitor";
import AdminBilling from "./pages/AdminBilling";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminCustomerService from "./pages/AdminCustomerService";
import AdminPurchaseRequests from "./pages/AdminPurchaseRequests";
import AdminContactMessages from "./pages/AdminContactMessages";

import UserDashboard from "./pages/UserDashboard";
import UserRobotPage from "./pages/UserRobotPage";
import UserMonitoringPage from "./pages/UserMonitoringPage";
import UserTasksPage from "./pages/UserTasksPage";
import UserAlertsPage from "./pages/UserAlertsPage";
import UserBillingPage from "./pages/UserBillingPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserSupportPage from "./pages/UserSupportPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import ContactPage from "./pages/ContactPage";
import SignupPage from "./pages/SignupPage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function RoleLandingRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shop" element={<ProtectedRoute requiredRole="user"><DashboardLayout><ShopPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/shop/:id" element={<ProtectedRoute requiredRole="user"><DashboardLayout><ProductDetailPage /></DashboardLayout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><RoleLandingRedirect /></ProtectedRoute>} />

        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin" permission="users">
              <DashboardLayout>
                <AdminUsersDatabase />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute requiredRole="admin" permission="users">
              <DashboardLayout>
                <AdminUserDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fleet"
          element={
            <ProtectedRoute requiredRole="admin" permission="roverManagement">
              <DashboardLayout>
                <AdminFleet />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/server"
          element={
            <ProtectedRoute requiredRole="admin" permission="dashboard">
              <DashboardLayout>
                <AdminServerMonitor />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/billing"
          element={
            <ProtectedRoute requiredRole="admin" permission="analytics">
              <DashboardLayout>
                <AdminBilling />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute requiredRole="admin" permission="analytics">
              <DashboardLayout>
                <AdminAnalytics />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requiredRole="admin" permission="settings">
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/purchase-requests"
          element={
            <ProtectedRoute requiredRole="admin" permission="users">
              <DashboardLayout>
                <AdminPurchaseRequests />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact-messages"
          element={
            <ProtectedRoute requiredRole="admin" permission="users">
              <DashboardLayout>
                <AdminContactMessages />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customer-service"
          element={
            <ProtectedRoute requiredRole="admin" permission="users">
              <DashboardLayout>
                <AdminCustomerService />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRole="user" permission="dashboard">
              <DashboardLayout>
                <UserDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/robot"
          element={
            <ProtectedRoute requiredRole="user" permission="dashboard">
              <DashboardLayout>
                <UserRobotPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/monitoring"
          element={
            <ProtectedRoute requiredRole="user" permission="camera">
              <DashboardLayout>
                <UserMonitoringPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/tasks"
          element={
            <ProtectedRoute requiredRole="user" permission="tasks">
              <DashboardLayout>
                <UserTasksPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/alerts"
          element={
            <ProtectedRoute requiredRole="user" permission="alerts">
              <DashboardLayout>
                <UserAlertsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/billing"
          element={
            <ProtectedRoute requiredRole="user" permission="settings">
              <DashboardLayout>
                <UserBillingPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute requiredRole="user" permission="settings">
              <DashboardLayout>
                <UserProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute requiredRole="user" permission="settings">
              <DashboardLayout>
                <UserOrdersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/support"
          element={
            <ProtectedRoute requiredRole="user" permission="tasks">
              <DashboardLayout>
                <UserSupportPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/settings"
          element={
            <ProtectedRoute requiredRole="user" permission="settings">
              <DashboardLayout>
                <UserSettingsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;