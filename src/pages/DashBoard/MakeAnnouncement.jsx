import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const MakeAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("https://blockwise-server.vercel.app/announcements", {
        title,
        description,
      });

      if (res.data?.result?.insertedId) {
        toast.success("Announcement posted successfully!");
        setTitle("");
        setDescription("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to post announcement");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Make Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>

        <button type="submit" className="btn btn-outline">
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
