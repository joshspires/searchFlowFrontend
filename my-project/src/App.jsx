import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import Sinngup from "./pages/Singup";
import EmailVerification from "./pages/VerifyEmail";
import ConnectWebflow from "./pages/ConnectWebflow";
import ResetPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./common/ProtectedRoute";
import WebsiteSettingsPage from "./pages/website-settings/WebsiteSettingsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";

const adminRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/connected-websites", element: <Dashboard /> },
  {
    path: "/connected-websites/settings/:id",
    element: <WebsiteSettingsPage />,
  },
  { path: "/settings", element: <Setting /> },
  { path: "/connect-webflow", element: <ConnectWebflow /> },
  { path: "/admin-dashboard", element: <AdminSettingsPage />, adminOnly: true },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/connected-websites" element={<Dashboard />} /> */}
        <Route path="/signup" element={<Sinngup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        {/* <Route path="/connect-webflow" element={<ConnectWebflow />} />
          <Route path="/settings" element={<Setting />} /> */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* protectedRoutes */}
        {/* Protected Routes */}
        {adminRoutes.map(({ path, element, adminOnly }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute adminOnly={adminOnly}>{element}</ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
