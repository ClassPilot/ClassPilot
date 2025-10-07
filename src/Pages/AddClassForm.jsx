import { useState } from "react";
import { BookOpen } from "lucide-react";

function AddClassForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
    grade_level: "",
    schedule: "",
    capacity: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate form submission (no backend)
    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Class created successfully!");
      // Optional: clear form
      setFormData({
        name: "",
        description: "",
        subject: "",
        grade_level: 0,
        schedule: "",
        capacity: 0,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-violet-500 text-white p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Class</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Mathematics, Science"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Grade Level
              </label>
              <input
                type="number"
                name="grade_level"
                value={formData.grade_level}
                onChange={handleChange}
                placeholder="1 - 12"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Max students"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Schedule
            </label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="e.g. Mon, Wed - 10:00 AM"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg shadow-sm font-medium transition-all"
          >
            {loading ? "Creating..." : "+ Add Class"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddClassForm;
