import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [stats, setStats] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setAdminData(res.data))
        .catch(err => console.error("Error fetching admin profile:", err));
    }

    axiosSecure.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching stats:", err));
  }, [user, axiosSecure]);

  if (!adminData || !stats) {
    return <div className="text-center mt-10">Loading admin profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Profile</h2>
      <div className="space-y-3">
        <div><span className="font-medium">Name:</span> {adminData.name}</div>
        <div><span className="font-medium">Email:</span> {adminData.email}</div>
        <div><span className="font-medium">Role:</span> {adminData.role}</div>

        <hr className="my-3" />
        <div><span className="font-medium">Total Rooms:</span> {stats.totalRooms}</div>
        <div><span className="font-medium">Available Rooms:</span> {stats.availableRooms} ({stats.availablePercentage}%)</div>
        <div><span className="font-medium">Unavailable (Agreement) Rooms:</span> {stats.unavailableRooms} ({stats.unavailablePercentage}%)</div>
        <div><span className="font-medium">Total Users:</span> {stats.totalUsers}</div>
        <div><span className="font-medium">Members:</span> {stats.members}</div>
      </div>
    </div>
  );
};

export default AdminProfile;

