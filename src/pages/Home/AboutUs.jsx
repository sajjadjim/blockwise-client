import React from "react";
import aboutImg from "../../../src/assets/window-7542846_1280.jpg"; 

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Image */}
        <div>
          <img
            src={aboutImg}
            alt="About BlockWise"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Right - Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About BlockWise
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            At BlockWise, we redefine urban living with smart and seamless
            apartment solutions. Our mission is to provide a modern community
            experience where residents enjoy comfort, security, and connectivity
            — all in one place.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>✔️ Easy apartment booking</li>
            <li>✔️ Secure payments with Stripe</li>
            <li>✔️ Community-driven dashboard</li>
            <li>✔️ Transparent and reliable service</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
