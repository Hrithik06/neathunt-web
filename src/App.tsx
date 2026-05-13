import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import { AuthError } from "./pages/AuthError";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./features/auth/AuthLayout";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
import ToastMessage from "./components/ui/ToastMessage";
const Dashboard = lazy(() => import("./pages/Dashboard"));
function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="toast"
            element={<ToastMessage text="Yo mama" variant="error" />}
          />
          <Route path="auth-error" element={<AuthError />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
