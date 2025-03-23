import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import EngineerDashboard from "./pages/EngineerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [userRole, setUserRole] = useState(null);

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar userRole={userRole} handleLogout={handleLogout} />
      <div className="container mt-4">
        {!userRole ? (
          <LoginPage setUserRole={setUserRole} />
        ) : (
          <Routes>
            <Route path="/user" element={userRole === "user" ? <UserDashboard /> : <Navigate to="/" />} />
            <Route path="/engineer" element={userRole === "engineer" ? <EngineerDashboard /> : <Navigate to="/" />} />
            <Route path="/admin" element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}