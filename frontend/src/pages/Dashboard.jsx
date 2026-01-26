import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // redirect if no token
        return;
      }

      try {
        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/"); // redirect if token invalid
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/"); // back to login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p className="mb-6">Your Role: {user.role}</p>
      <button
        onClick={logout}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
