import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AgreementRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch all pending agreements
    axios.get("https://blockwise-server.vercel.app/api/agreements/pending")
      .then(res => {
        setRequests(res.data || []);
      })
      .catch(err => {
        toast.error("Failed to fetch agreement requests");
      });
  }, []);




  const handleDecision = async ({ id, email, accepted }) => {
    console.log("Sending ID:", id);
    try {
      const { data } = await axios.patch(`https://blockwise-server.vercel.app/api/agreements/respond/${id}`, {
        email,
        accepted,
      });

      if (data.success) {
        toast.success(`Request ${accepted ? "accepted" : "rejected"} successfully`);
        setRequests(prev => prev.filter(req => req._id !== id));
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Agreement error:", error);
      toast.error("Failed to process the request");
    }
  };



  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Agreement Requests</h2>

      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Floor</th>
                <th>Block</th>
                <th>Room</th>
                <th>Rent</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id}>
                  <td>{req.name}</td>
                  <td>{req.email}</td>
                  <td>{req.floorNo}</td>
                  <td>{req.blockName}</td>
                  <td>{req.apartmentNo}</td>
                  <td>{req.rent}</td>
                  <td>{new Date(parseInt(req._id.substring(0, 8), 16) * 1000).toLocaleDateString()}</td>
                  <td className="flex gap-2">


                    <button
                      onClick={() =>
                        handleDecision({ id: req._id, email: req.email, accepted: true })
                      }
                      className="btn btn-sm btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleDecision({ id: req._id, email: req.email, accepted: false })
                      }
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgreementRequests;

