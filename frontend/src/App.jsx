import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Navbar
import Navbar from "./components/Navbar";

// Public Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Plans from "./pages/Plans";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import MemberDashboard from "./pages/Dashboard/MemberDashboard";
import TrainerDashboard from "./pages/Dashboard/TrainerDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

// Private Route
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />

        <Route
          path="/classes"
          element={
            <>
              <Navbar />
              <Classes />
            </>
          }
        />

        <Route
          path="/plans"
          element={
            <>
              <Navbar />
              <Plans />
            </>
          }
        />

        {/* Auth Pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes WITHOUT Navbar */}
        <Route element={<PrivateRoute />}>
          <Route path="/member-dashboard" element={<MemberDashboard />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
