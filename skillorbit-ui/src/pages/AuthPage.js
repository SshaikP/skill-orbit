import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {

  const [view, setView] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ LOGIN

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data); // ✅ DEBUG

      // ✅ PROPER CHECK
      if (res.ok && data.token) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);

        console.log("LOGIN SUCCESS ✅");

        window.location.href = "/dashboard";  // ✅ THIS WILL NOW WORK

      } else {
        setError(data.error || "Login failed ❌");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed ❌");
    }
  };


  // ✅ REGISTER
  const handleRegister = async () => {

    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
          role: role // ✅ USER / ADMIN
        })
      });

      const text = await res.text();

      alert(text);
      setView("login");

    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="login-container">

      <h2>⚡ SkillOrbit</h2>

      {view === "login" && (
        <>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p onClick={() => setView("register")} style={{ cursor: "pointer", color: "#4da6ff" }}>
            New user? Register
          </p>
        </>
      )}

      {view === "register" && (
        <>
          <input
            placeholder="Username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ✅ ROLE DROPDOWN */}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button onClick={handleRegister}>Register</button>

          <p onClick={() => setView("login")} style={{ cursor: "pointer", color: "#aaa" }}>
            Back to Login
          </p>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

    </div>
  );
}

export default AuthPage;