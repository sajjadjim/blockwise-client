import { useState } from "react";

const AddReview = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.review) {
      alert("Please fill in all required fields.");
      return;
    }

    const newReview = {
      id: Date.now(),
      ...formData,
      image:
        formData.image ||
        "https://via.placeholder.com/150?text=User", 
    };

    setReviews((prev) => [newReview, ...prev]);
    setFormData({ name: "", role: "", review: "", image: "" });
  };

  return (
    <section className="bg-gray-50 py-12 ">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Share Your Experience</h2>
        
        {/* Add Review Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 mb-10"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Your Role (Tenant/Owner)"
              value={formData.role}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
              required
            />
            <input
              type="url"
              name="image"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <textarea
            name="review"
            placeholder="Write your review..."
            value={formData.review}
            onChange={handleChange}
            rows="4"
            className="border rounded-lg p-3 w-full mt-4"
            required
          ></textarea>
          <button
            type="submit"
            className="btn-outline border text-black px-6 py-3 rounded-lg mt-4 transition hover:cursor-pointer"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-lg shadow-md p-5 flex items-start"
            >
              <img
                src={rev.image}
                alt={rev.name}
                className="w-14 h-14 rounded-full mr-4 border-2 border-blue-500"
              />
              <div>
                <h4 className="font-semibold">{rev.name}</h4>
                <p className="text-sm text-gray-500">{rev.role}</p>
                <p className="mt-2 text-gray-700 italic">"{rev.review}"</p>
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-500 col-span-2 text-center">
              No reviews yet. Be the first to share your experience!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddReview;
