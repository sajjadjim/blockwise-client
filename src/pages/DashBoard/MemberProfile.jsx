import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/agreements?email=${user.email}`)
        .then(res => {
          const agreementData = Array.isArray(res.data) ? res.data[0] : res.data;
          setAgreement(agreementData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email, axiosSecure]);

  if (loading) return <p>Loading...</p>;
  if (!agreement?.name) return <p>No agreement found for this user.</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
    <img
  src={user.photoURL || "https://via.placeholder.com/100"}
  alt={user.displayName || agreement.name}
  className="w-24 h-24 rounded-full border-2 object-cover  mb-4"
/>
      {/* User Info */}
      <div className="mb-6 space-y-2">
        <p><strong>Name:</strong> {agreement.name}</p>
        <p><strong>Email:</strong> {agreement.email}</p>
        <p><strong>Agreement Accept Date:</strong> 
          {" "}{new Date(agreement.acceptDate || agreement.createdAt || Date.now()).toLocaleDateString()}
        </p>
      </div>

      {/* Apartment Info */}
      <div className="border-t pt-4 space-y-2">
        <h3 className="text-lg font-semibold">Rented Apartment Info</h3>
        <p><strong>Block:</strong> {agreement.blockName}</p>
        <p><strong>Floor:</strong> {agreement.floorNo}</p>
        <p><strong>Room No:</strong> {agreement.apartmentNo}</p>
        <p><strong>Rent:</strong> ৳{Number(agreement.rent).toFixed(2)}</p>
        <p><strong>Status:</strong> {agreement.status}</p>
      </div>
    </div>
  );
};

export default MemberProfile;

