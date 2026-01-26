import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../helpers/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { name, email, password, role });
      setShowVerification(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/verify-email", {
        email,
        code: verificationCode,
      });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Verification Failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")`,
      }}
    >
      <div className="absolute inset-0 bg-slate-900/35"></div>

      <Link
        to="/"
        className="absolute top-6 left-6 z-20 text-white/90 hover:text-white font-medium"
      >
        ← Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-xl p-10">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="Supreme Fitness Logo"
            className="h-20 w-20 rounded-full border-4 border-red-600 object-cover shadow-lg"
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 uppercase">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </select>

          {/* Trainer Info Note */}
          {role === "trainer" && (
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 text-sm text-gray-700">
              <p className="font-semibold mb-2">
                Trainer Registration Information
              </p>
              <p className="mb-2">
                Please also complete the Google Form below. Our team will review
                your profile and approve your trainer account.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScigdLP_CPxIaztXMLL1UIc6QbMUaedw-VbhK49FAB3jz6n8Q/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-semibold hover:underline"
              >
                👉 Open Trainer Application Form
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold uppercase shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>
      </div>

      {/* Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md relative">
            <button
              onClick={() => setShowVerification(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              Verify Email
            </h2>

            <form onSubmit={handleVerify} className="space-y-6">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
                className="w-full px-4 py-3 border rounded-lg text-center"
              />

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
              >
                Verify Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}