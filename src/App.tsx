import { Routes, Route } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import OldNavBar from "./components/OldNavBar";

import DashboardV3 from "./pages/DashboardV3";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      {/* <OldNavBar /> */}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="dashboard" element={<DashboardV3 />} />
        <Route path="login" element={<LoginPage />} />
        {/*<Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} />*/}
      </Routes>
    </>
  );
}

export default App;
