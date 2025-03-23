import { Link } from "react-router-dom";

export default function Navbar({ userRole, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <h1 className="navbar-brand">IT Support System</h1>
      <div className="ml-auto">
        {userRole && (
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}