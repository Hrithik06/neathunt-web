import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import { AuthError } from "./pages/AuthError";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./features/auth/AuthLayout";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
const Dashboard = lazy(() => import("./pages/Dashboard"));
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
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
        </AuthProvider>{" "}
      </QueryClientProvider>
    </>
  );
}

export default App;
