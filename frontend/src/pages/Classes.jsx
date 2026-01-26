import {
  FaDumbbell,
  FaRunning,
  FaHeartbeat,
  FaFire,
  FaBiking,
  FaSpa,
} from "react-icons/fa";

export default function Classes() {
  const classes = [
    //classes to show in home page:
    {
      title: "Strength Training",
      icon: <FaDumbbell className="text-4xl text-red-500" />,
      desc: "Build muscle and power using professional resistance and weight programs.",
    },
    {
      title: "Cardio Blast",
      icon: <FaRunning className="text-4xl text-red-500" />,
      desc: "Boost stamina and burn calories with high-energy cardio workouts.",
    },
    {
      title: "HIIT Burn",
      icon: <FaFire className="text-4xl text-red-500" />,
      desc: "Short, intense sessions designed to torch fat and increase endurance.",
    },
    {
      title: "Cross Training",
      icon: <FaBiking className="text-4xl text-red-500" />,
      desc: "A mix of strength and cardio workouts to improve overall athletic ability.",
    },
    {
      title: "Yoga & Recovery",
      icon: <FaSpa className="text-4xl text-red-500" />,
      desc: "Improve flexibility, balance, and recovery through guided yoga sessions.",
    },
    {
      title: "Functional Fitness",
      icon: <FaHeartbeat className="text-4xl text-red-500" />,
      desc: "Train movements used in daily life to increase strength and mobility.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 text-gray-100 pt-32 pb-24">
      {/* Page Header */}
      <div className="text-center mb-16 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          <span className="text-black">Our</span> <span className="text-red-600">Classes</span>
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto">
          Choose from a variety of expert-led classes designed for every fitness level.
        </p>
      </div>

      {/* Classes Grid */}
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">
        {classes.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8
                       hover:border-red-600/50 transition-colors duration-300 group"
          >
            <div className="mb-6 p-4 bg-zinc-950 inline-block rounded-xl
                            group-hover:scale-110 transition-transform duration-300
                            border border-zinc-800">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-zinc-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
