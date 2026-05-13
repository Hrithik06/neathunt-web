import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import { AuthError } from "./pages/AuthError";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./features/auth/AuthLayout";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
const Dashboard = lazy(() => import("./pages/Dashboard"));
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Toaster position="bottom-right" reverseOrder={false} />
          <Routes>
            <Route index element={<LandingPage />} />

            <Route element={<AuthLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="auth-error" element={<AuthError />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
