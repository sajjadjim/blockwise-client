import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    description: "",
  });

  useEffect(() => {
    axios.get("https://blockwise-server.vercel.app/coupons").then((res) => {
      setCoupons(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blockwise-server.vercel.app/coupons", formData);
      toast.success("Coupon added");
      setModalOpen(false);
      setFormData({ code: "", discount: "", description: "" });

      // Refresh coupon list
      const res = await axios.get("https://blockwise-server.vercel.app/coupons");
      setCoupons(res.data);
    } catch {
      toast.error("Failed to add coupon");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Coupons</h2>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">Add Coupon</button>
      </div>

      {coupons.length === 0 ? (
        <p>No coupons available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount (%)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.code}</td>
                  <td>{c.discount}</td>
                  <td>{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-xl font-bold mb-2">Add New Coupon</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Coupon Code"
                className="input input-bordered w-full"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
              <input
                type="number"
                placeholder="Discount (%)"
                className="input input-bordered w-full"
                required
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              />
              <textarea
                placeholder="Coupon Description"
                className="textarea textarea-bordered w-full"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-sm btn-error"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupon;
