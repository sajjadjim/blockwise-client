import { useEffect, useState } from "react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("https://blockwise-server.vercel.app/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Announcements</h2>
      <ul className="space-y-4">
        {announcements.map((a) => (
          <li key={a._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p>{a.message}</p>
            <small className="text-gray-500">
              {new Date(a.date).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;

