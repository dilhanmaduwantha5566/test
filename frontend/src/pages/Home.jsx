
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import {
  FaDumbbell, FaRunning, FaHeartbeat, FaUsers, FaLeaf, FaClock,
  FaAppleAlt, FaShieldAlt, FaSpa, FaChartLine, FaUser, FaStar, FaStarHalfAlt
} from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Home() {
  // Unused state variables and effect removed

  const features = [
    { icon: <FaDumbbell />, title: "Premium Equipment", desc: "Top-tier machines to maximize results.", color: "from-red-400 to-red-300" },
    { icon: <FaRunning />, title: "Expert Trainers", desc: "Certified coaches guide you safely.", color: "from-blue-400 to-blue-300" },
    { icon: <FaHeartbeat />, title: "Holistic Health", desc: "Nutrition & recovery programs tailored.", color: "from-green-400 to-green-300" },
    { icon: <FaUsers />, title: "Community Support", desc: "Stay motivated with our fitness tribe.", color: "from-yellow-400 to-yellow-300" },
    { icon: <FaLeaf />, title: "Wellness Programs", desc: "Yoga, meditation & lifestyle coaching.", color: "from-purple-400 to-purple-300" },
    { icon: <FaClock />, title: "Flexible Hours", desc: "Access the gym anytime.", color: "from-pink-400 to-pink-300" },
    { icon: <FaAppleAlt />, title: "Nutrition Plans", desc: "Personalized diet plans included.", color: "from-orange-400 to-orange-300" },
    { icon: <FaShieldAlt />, title: "Safety First", desc: "Sanitized & safe environment.", color: "from-indigo-400 to-indigo-300" },
    { icon: <FaSpa />, title: "Relaxation Zone", desc: "Sauna, steam & recovery spaces.", color: "from-teal-400 to-teal-300" },
    // new boxes
    { icon: <FaChartLine />, title: "Progress Tracking", desc: "Monitor your workouts and see real-time results.", color: "from-red-500 to-red-400" },
    { icon: <FaUsers />, title: "Group Classes", desc: "Join dynamic classes like HIIT, Zumba, and Pilates.", color: "from-blue-500 to-blue-400" },
    { icon: <FaUser />, title: "Personalized Coaching", desc: "One-on-one sessions tailored to your fitness goals.", color: "from-green-500 to-green-400" },
  ];

  const galleryImages = [
    "https://images.squarespace-cdn.com/content/v1/60469efa07092c2776c3ef2c/9fb05acf-5112-4028-b758-b21f8708a0a9/26a9eab1-6f53-4c7b-885f-522e9eab43c5.JPG",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6mWYAJOUfyv3A-W2X1gYykRHEhavS7ptpw&s"
  ];

  const plans = [
    { title: "Basic", price: "LKR 10 000/mo", features: ["Gym Access", "1 Personal Training Session", "Group Classes"], color: "bg-red-500 text-white" },
    { title: "Pro", price: "$LKR 25 000/mo", features: ["Gym Access", "Weekly PT", "Group Classes", "Nutrition Plan"], color: "bg-white" },
    { title: "Elite", price: "$LKR 40 000/mo", features: ["All Pro Features", "Unlimited PT", "Wellness Coaching", "Sauna Access"], color: "bg-gray-800 text-white" },
  ];

  const testimonials = [
    { name: "M.N Sarath.", feedback: "Supreme Fitness changed my life! The trainers are top-notch.", rating: 5 },
    { name: "Dilan T.", feedback: "Best gym in town! Clean, modern, and friendly.", rating: 4.5 },
    { name: "Samantha L.", feedback: "Amazing community and equipment. Highly recommend!", rating: 5 },
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 flex flex-col overflow-x-hidden min-h-screen">


      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center filter brightness-90 animate-heroZoom" style={{ backgroundImage: "url('https://gymgear.com/cdn/shop/articles/AdobeStock_317724775-scaled-1-3050369_21f7ab10-0502-4944-8fd5-8a89f3d73a59-4378325.jpg?v=1767911049')" }}></div>
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fadeUp">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Transform Your Body <br />
            <span className="text-red-500 animate-textFade">Achieve Your Goals</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-semibold mb-10 drop-shadow-lg">
            Join our community to access top trainers, modern equipment, and a supportive environment for your fitness journey.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-red-500 text-white rounded-full font-bold text-lg hover:bg-red-600 hover:scale-105 transition-all duration-500 shadow-lg animate-bounceHover">
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Why Supreme Fitness?</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide more than a gym — we provide a complete experience to transform your lifestyle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className={`p-8 rounded-2xl shadow-lg transition-transform duration-500 hover:-translate-y-3 text-center bg-gradient-to-br ${feature.color}`}>
                <div className="mb-6 p-5 inline-block rounded-full bg-white text-4xl text-gray-900 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-white text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeUp">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Explore Our Gym</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Take a glimpse of our modern facilities and top-notch equipment.</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-xl shadow-lg group hover:shadow-2xl transition-shadow duration-500">
                <img src={img} alt={`Gym ${idx + 1}`} className="w-full h-80 object-cover transform transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center animate-fadeUp">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">Membership Plans</h2>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-8"></div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-2xl shadow-lg transition-transform duration-500 hover:-translate-y-3 ${plan.color}`}>
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((f, i) => <li key={i} className="text-gray-700 dark:text-gray-200">{f}</li>)}
                </ul>
                <Link className={`px-6 py-3 rounded-full font-bold ${plan.color.includes("bg-white") ? "bg-red-500 text-white hover:bg-red-600" : "bg-white text-red-500 hover:bg-gray-200"} transition-all duration-500`} to="/register">
                  Join Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center animate-fadeUp">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">What Our Members Say</h2>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full mb-8"></div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 rounded-2xl shadow-lg bg-white text-gray-900 transition-transform duration-500 hover:-translate-y-3">
                <div className="mb-4 text-yellow-400 flex justify-center gap-1">
                  {Array.from({ length: Math.floor(t.rating) }).map((_, i) => <FaStar key={i} />)}
                  {t.rating % 1 !== 0 && <FaStarHalfAlt />}
                </div>
                <p className="mb-4">"{t.feedback}"</p>
                <h4 className="font-bold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 flex justify-center bg-black">
        <div className="max-w-3xl text-center px-8 py-12 rounded-2xl shadow-lg animate-fadeUp bg-red-500">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Ready to Start?</h2>
          <p className="text-lg md:text-xl mb-8 text-black">Join thousands who are achieving their fitness goals today.</p>
          <Link
            to="/register"
            className="inline-block px-10 py-5 bg-black text-red-500 rounded-full font-extrabold text-xl hover:bg-gray-900 transition-all duration-500 shadow-md animate-bounceHover"
          >
            Get Your Membership
          </Link>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white py-10 border-t border-gray-200 text-center animate-fadeUp delay-500">
        <p className="text-gray-500">© {new Date().getFullYear()} Supreme Fitness Gym. All rights reserved.</p>
      </footer>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes heroZoom { 0% { transform: scale(1.05); } 50% { transform: scale(1.1); } 100% { transform: scale(1.05); } }
        @keyframes textFade { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes bounceHover { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        .animate-fadeUp { animation: fadeUp 1s ease forwards; }
        .animate-fadeDown { animation: fadeDown 0.7s ease forwards; }
        .animate-heroZoom { animation: heroZoom 20s ease-in-out infinite alternate; }
        .animate-textFade { animation: textFade 1.5s ease forwards; }
        .animate-bounceHover:hover { animation: bounceHover 0.5s ease forwards; }
      `}</style>
    </div>
  );
}
