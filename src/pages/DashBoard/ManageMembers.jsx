import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://blockwise-server.vercel.app/users?role=member");
      setMembers(res.data);
    } catch (err) {
      toast.error("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (email) => {
    const confirm = window.confirm("Are you sure you want to remove this member?");
    if (!confirm) return;

    try {
      const res = await axios.patch(`https://blockwise-server.vercel.app/users/downgrade/${email}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Member removed successfully (role changed to 'user')");
        fetchMembers(); // Refresh the list
      } else {
        toast.error("No changes made");
      }
    } catch (err) {
      toast.error("Error removing member");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Members</h2>
      {loading ? (
        <p>Loading members...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {members.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveMember(user.email)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;


