import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../assets/404 Error - Doodle animation.json";

const Errorpage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-64 h-64 mb-8">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Sorry, the page you are looking for could not be found.
      </h2>

      <p className="text-gray-600 mb-10 max-w-md mx-auto">
        Please check the URL or try refreshing the page. 
      </p>

      <Link
        to="/"
        className="inline-block btn-outline text-black border px-6 py-3 rounded-md font-semibold hover:cursor-pointer transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Errorpage;

