import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaBusAlt, FaTrain, FaCar } from "react-icons/fa";

const LocationDetails = () => {
  const position = [23.8103, 90.4125]; // Example: Dhaka, Bangladesh

  return (
    <section className="bg-[#f9fafb] py-16 px-6 md:px-10 lg:px-20 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
           Apartment Location & Directions
        </h2>
        <p className="text-gray-600 text-base max-w-3xl mx-auto mb-10">
          Our building is located in a premium neighborhood with quick access to all essentials — schools, hospitals, markets, and transport hubs. Easily reachable from anywhere in the city.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  BloCKWise Apartment <br /> 123 Block Street, City, BD
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Directions Info */}
          <div className="text-left space-y-6">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-black mt-1" size={22} />
              <div>
                <h4 className="font-semibold text-gray-700">Address</h4>
                <p className="text-gray-600 text-sm">
                  BloCKWise Apartment, 123 Block Street, Dhaka 1205, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaCar className="text-black mt-1" size={22} />
              <div>
                <h4 className="font-semibold text-gray-700">By Car</h4>
                <p className="text-gray-600 text-sm">
                  20 mins drive from Airport. Free visitor parking available.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaTrain className="text-black mt-1" size={22} />
              <div>
                <h4 className="font-semibold text-gray-700">By Train</h4>
                <p className="text-gray-600 text-sm">
                  10 mins walk from Dhaka Central Railway Station.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaBusAlt className="text-black mt-1" size={22} />
              <div>
                <h4 className="font-semibold text-gray-700">By Bus</h4>
                <p className="text-gray-600 text-sm">
                  Direct route via Bus 7A from city center. Stop at "Blockwise Gate".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;
