import { Routes, Route } from "react-router";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      {/*<OldNavBar />*/}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/*<Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} />*/}
      </Routes>
    </>
  );
}

export default App;
