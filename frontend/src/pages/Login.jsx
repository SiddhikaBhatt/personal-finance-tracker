import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });

    console.log("LOGIN RESPONSE:", res.data); // 🔍 DEBUG

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } else {
      alert("Token not received");
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};


  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
