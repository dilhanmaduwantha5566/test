import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.jpg"
            alt="Supreme Fitness Logo"
            className="h-12 w-12 rounded-full border-2 border-red-500 object-cover"
          />
          <span className="text-2xl font-bold uppercase text-gray-900">
            Supreme <span className="text-red-500">Fitness</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium uppercase text-gray-700">
          {["Home", "About", "Classes", "Plans", "Contact"].map((item) => (
            <li key={item} className="hover:text-red-500 transition">
              <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 border rounded-full hover:border-red-500 hover:text-red-500"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 flex flex-col items-center space-y-4">
          {["Home", "About", "Classes", "Plans", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg hover:text-red-500"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
