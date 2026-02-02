import { motion } from "framer-motion";
import {
  FaBuilding,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";

const AboutBuilding = () => {
  return (
    <section className="bg-[#f8fafc] py-16 px-4 md:px-10 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay:0.2}}
        >
          Discover BloCKWise Living
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="font-semibold text-gray-800">BloCKWise</span> is more than just a building — it's a modern living experience enhanced by intelligent systems. With seamless digital management, sustainable design, and <br /> round-the-clock security, our residents live smarter every day.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-left">
          {[
            {
              icon: <FaBuilding size={28} className="text-black" />,
              title: "Smart Infrastructure",
              desc: "Equipped with energy-efficient elevators, solar backups, sensor-based lighting, and spacious green areas for relaxing and socializing.",
            },
            {
              icon: <FaMobileAlt size={28} className="text-black" />,
              title: "Digital Living",
              desc: "Pay rent, book amenities, track maintenance — all from your mobile. Get real-time alerts and manage everything through your dashboard.",
            },
            {
              icon: <FaShieldAlt size={28} className="text-black" />,
              title: "Secure & Protected",
              desc: "24/7 surveillance, app-based visitor entry logs, and fire/emergency alerts. Safety is our highest priority for every resident.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;







