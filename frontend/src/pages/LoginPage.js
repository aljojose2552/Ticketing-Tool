import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // POST request to login API on backend
      const response = await axios.post("http://localhost:3000/users/login", { email, password });

      // On successful login, save token and role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.user.role);

      setUserRole(response.data.user.role);

      // Redirect based on role
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else if (response.data.user.role === "engineer") {
        navigate("/engineer");
      } else {
        navigate("/user");
      }
    } catch (err) {
      // Handle errors (invalid login, etc.)
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="form-group">
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
