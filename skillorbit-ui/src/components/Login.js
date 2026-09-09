import { useState } from "react";

function Login({ onLogin }) {
  const [view, setView] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      onLogin();

    } catch (err) {
      setError("❌ Invalid credentials");
    }
  };

  const handleRegister = async () => {
    try {
      setError("");

      if (!registerUsername || !registerPassword) {
        setError("❌ Username and password are required");
        return;
      }

      if (registerPassword !== confirmPassword) {
        setError("❌ Passwords do not match");
        return;
      }

      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // ✅ registration succeeded — send user back to login
      setRegisterUsername("");
      setRegisterPassword("");
      setConfirmPassword("");
      setView("login");

    } catch (err) {
      setError(err.message ? `❌ ${err.message}` : "❌ Registration failed");
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

export default Login;