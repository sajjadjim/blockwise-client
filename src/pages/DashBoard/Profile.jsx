import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios"; // Your custom Axios hook

const Profile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxios();
  const [dbUser, setDbUser] = useState(null);

  // Fetch user info from backend using email
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/${user.email}`)
        .then((res) => setDbUser(res.data))
        .catch((err) => console.error("Error loading user info:", err));
    }
  }, [user, axiosPublic]);

  // Default fallbacks if no data is loaded yet
  const agreementAcceptDate = "none";
  const apartmentInfo = {
    floor: "none",
    block: "none",
    roomNo: "none",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {dbUser ? (
        <div className="flex items-center space-x-4">
          <img
            src={dbUser.photoURL || "https://via.placeholder.com/100"}
            alt={dbUser.name}
            className="w-24 h-24 rounded-full border-2 object-cover"
          />
          <div className="space-y-2">
            <p><strong>Name:</strong> {dbUser.name}</p>
            <p><strong>Email:</strong> {dbUser.email}</p>
            <p><strong>Agreement Accept Date:</strong> {agreementAcceptDate}</p>
            <p><strong>Rented Apartment:</strong> none</p>
            <ul className="space-y-2">
              <li><strong>Floor:</strong> {apartmentInfo.floor}</li>
              <li><strong>Block:</strong> {apartmentInfo.block}</li>
              <li><strong>Room No:</strong> {apartmentInfo.roomNo}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

