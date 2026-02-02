import React from "react";

const reviews = [
  {
    name: "Sarah Ahmed",
    role: "Resident",
    text: "BlockWise made finding and booking my apartment so smooth. I love the modern dashboard and secure payments!",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "John Smith",
    role: "Member",
    text: "The platform is very user-friendly. I can manage everything in one place. Highly recommend!",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Maria Khan",
    role: "Resident",
    text: "Professional and reliable service. The support team is always responsive and helpful.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Reviews = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Our Residents Say
        </h2>
        <p className="text-gray-600 mt-3">
          Real experiences from people who live with us
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.img}
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {review.name}
                </h4>
                <span className="text-sm text-gray-500">{review.role}</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
