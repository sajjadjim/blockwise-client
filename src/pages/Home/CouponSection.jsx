import { FaTags, FaClock, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const coupons = [
  {
    title: "10% OFF Maintenance Fee",
    code: "BLOCK10",
    expiry: "Expires: 31 Aug 2025",
    bg: "bg-[#d1f5f0] text-[#007f7f]", // sea green theme
  },
  {
    title: "Free Visitor Parking",
    code: "VISITOR100",
    expiry: "Valid All Weekends",
    bg: "bg-[#d0f0fd] text-[#0e7490]", // blue tone
  },
  {
    title: "15% OFF Community Events",
    code: "EVENT15",
    expiry: "Until 15 Sept 2025",
    bg: "bg-[#e0fbf4] text-[#1e7565]", // minty sea green
  },
];

const CouponSection = () => {
  return (
    <section className="py-14 px-6 md:px-12 bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
           Member Exclusive Coupons
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-6 rounded-xl shadow-md ${coupon.bg} relative overflow-hidden transition`}
            >
              <FaTags className="absolute top-4 right-4 text-xl opacity-20" />
              <h3 className="text-lg font-semibold mb-2">{coupon.title}</h3>

              <div className="flex items-center gap-2 text-sm mb-2">
                <FaClock className="opacity-70" />
                <span>{coupon.expiry}</span>
              </div>

              <div className="bg-white text-gray-800 font-mono text-sm px-3 py-1 rounded-md inline-block shadow-inner">
                {coupon.code}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
                <FaCheckCircle />
                Use this coupon at checkout
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;



