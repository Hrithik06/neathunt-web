import { Routes, Route } from "react-router";

import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { AuthError } from "./pages/AuthError";

function App() {
  return (
    <>
      {/*<OldNavBar />*/}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="auth-error" element={<AuthError />} />
        {/*<Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} />*/}
      </Routes>
    </>
  );
}

export default App;
