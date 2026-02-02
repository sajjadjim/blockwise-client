

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const ApartmentSection = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const res = await axios.get("https://blockwise-server.vercel.app/apartments");
        setApartments(res.data.apartments || []);
      } catch (err) {
        setError("Unable to fetch apartments at the moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchApartments();
  }, []);

  if (loading) return <p className="text-center py-16 text-gray-500"><span className="loading loading-ball loading-xl"></span></p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;
  if (apartments.length === 0) return <p className="text-center py-16 text-gray-500">No apartments available.</p>;

  return (
    <section className="bg-[#f8fafc] py-20 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <header className="mb-14 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Discover Your Next Home</h2>
          <p className="text-gray-600 text-lg">
            Browse our selection of premium apartments designed for modern living. Comfortable, secure, and conveniently located.
          </p>
        </header>

        {/* Apartments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {apartments.map((apt) => (
            <article
              key={apt._id}
              className="flex flex-col rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              style={{ minHeight: "400px" }} // consistent card height
            >
              <img
                src={apt.apartmentImage || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={apt.title || `Apartment ${apt.apartmentNo}`}
                className="h-48 w-full object-cover"
              />

              <div className="flex flex-col flex-grow p-6 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {apt.title || `Apartment ${apt.apartmentNo}`}
                </h3>

                <p className="text-gray-700 flex-grow text-sm mb-4 line-clamp-3">
                  {apt.description || "This apartment offers great comfort and convenience with modern amenities."}
                </p>
                <Link to='/apartments' className="mt-auto btn-outline  text-black border py-2 rounded-lg font-semibold hover:cursor-pointer transition-colors text-center">
                                <button

                  aria-label={`See more details about ${apt.title || `Apartment ${apt.apartmentNo}`}`}
                >
                  See More
                </button>
                </Link>


              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApartmentSection;

