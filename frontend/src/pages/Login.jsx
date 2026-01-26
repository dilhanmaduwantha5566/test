import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../helpers/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot Password States
  const [showForgot, setShowForgot] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      alert("Login successful!");
      if (res.data.role === "admin") navigate("/admin-dashboard");
      else if (res.data.role === "member") navigate("/member-dashboard");
      else navigate("/trainer-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      if (resetStep === 1) {
        const res = await api.post("/auth/forgot-password", { email: resetEmail });
        alert(res.data.message);
        setResetStep(2);
      } else {
        const res = await api.post("/auth/reset-password", { email: resetEmail, code: resetCode, newPassword });
        alert(res.data.message);
        setShowForgot(false);
        setResetStep(1);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        // MATCHING THE ASH-COLORED PROFESSIONAL BACKGROUND
        backgroundImage: `url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")`,
      }}
    >
      {/* SOFT ASH OVERLAY */}
      <div className="absolute inset-0 bg-slate-900/35"></div>

      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium drop-shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </Link>

      {/* WHITE TRANSPARENT LOGIN BOX */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-10">
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-20 w-20 rounded-full border-4 border-red-600 shadow-md"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 uppercase tracking-wider">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-gray-900 placeholder-gray-400 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white text-gray-900 placeholder-gray-400 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-gradient-to-r from-red-600 to-red-800 hover:brightness-110 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button onClick={() => setShowForgot(true)} className="text-gray-600 hover:text-red-600 text-sm font-medium transition-colors">Forgot Password?</button>
          <p className="text-gray-500 text-sm">
            Don't have an account? <Link to="/register" className="text-red-600 hover:text-red-700 font-bold transition-colors ml-1">Register</Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal (Matching Style) */}
      {showForgot && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white relative">
            <button
              onClick={() => setShowForgot(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-extrabold mb-6 text-gray-900 text-center uppercase">Reset Password</h2>

            <form onSubmit={handleForgotSubmit} className="space-y-6">
              {resetStep === 1 ? (
                <>
                  <p className="text-gray-600 text-center text-sm">Enter your email to receive a code.</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-red-600 text-gray-900 outline-none"
                  />
                  <button type="submit" className="w-full py-3 text-white bg-red-600 rounded-xl font-bold uppercase shadow-lg">Send Code</button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="6-digit Code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-center tracking-widest text-lg font-bold"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl"
                  />
                  <button type="submit" className="w-full py-3 text-white bg-red-600 rounded-xl font-bold uppercase shadow-lg">Reset Password</button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}