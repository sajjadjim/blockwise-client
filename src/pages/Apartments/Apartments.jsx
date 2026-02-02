import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";

const Apartments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [refreshRole, setRefreshRole] = useState(0);
  const { role } = useUserInfo(refreshRole);

  const limit = 6;

  useEffect(() => {
    const query = { page, limit };
    if (minRent && maxRent) {
      query.minRent = minRent;
      query.maxRent = maxRent;
    }

    axios
      .get("https://blockwise-server.vercel.app/apartments", { params: query })
      .then((res) => {
        setApartments(res.data.apartments);
        setTotal(res.data.total);
      })
      .catch((err) => console.error(err));
  }, [page, minRent, maxRent]);

  const totalPages = Math.ceil(total / limit);

  const handleAgreement = async (apartment) => {
    if (!user) {
      toast.error("Please login first to apply.");
      navigate("/login");
      return;
    }

    const agreementData = {
      email: user.email,
      name: user.displayName || user.name,
      apartmentNo: apartment.apartmentNo,
      floorNo: apartment.floorNo,
      blockName: apartment.blockName,
      rent: apartment.rent,
    };

    try {
      const response = await axios.post("https://blockwise-server.vercel.app/api/agreements", agreementData);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application sent!",
          text: "Your agreement application is now pending.",
        });
        setRefreshRole((prev) => prev + 1); // refresh user role
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to apply for agreement.");
    }
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* Filter section */}
      <div className="flex flex-col sm:flex-row items-center max-w-7xl gap-10 justify-center mt-8 mb-6">
        <input
          type="number"
          placeholder="Minimum Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="input input-bordered input-sm w-full sm:w-40"
        />
        <input
          type="number"
          placeholder="Maximum Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="input input-bordered input-sm w-full sm:w-40"
        />
        <button
          className="btn btn-outline btn-sm w-full sm:w-auto"
          onClick={() => setPage(1)}
        >
          Search
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Available Apartments</h2>

      {/* Apartment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments.map((apt, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={apt.apartmentImage}
              alt="Apartment"
              className="rounded-lg mb-4 h-48 w-full object-cover"
            />
            <p><strong>Floor:</strong> {apt.floorNo}</p>
            <p><strong>Block:</strong> {apt.blockName}</p>
            <p><strong>Apartment No:</strong> {apt.apartmentNo}</p>
            <p><strong>Rent:</strong> {apt.rent}৳</p>
            <button
              className="btn btn-outline btn-sm mt-4 w-full"
              onClick={() => handleAgreement(apt)}
            >
              Apply for Agreement
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
        <button
          className="btn btn-outline btn-sm"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartments;

