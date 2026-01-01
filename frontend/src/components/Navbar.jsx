import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#111", color: "#fff" }}>
      <Link to="/dashboard" style={{ marginRight: "10px", color: "#fff" }}>
        Dashboard
      </Link>

      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "10px", color: "#fff" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "#fff" }}>
            Register
          </Link>
        </>
      ) : (
        <button onClick={logout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      )}
    </nav>
  );
}
