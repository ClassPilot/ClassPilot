// src/Pages/AddStudentForm.jsx
import { useState } from "react";
import { UserPlus } from "lucide-react";

function AddStudentForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    notes: "",
    email: "",
    parentEmail: "",
    parentPhone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  const validate = () => {
    if (!formData.full_name || formData.full_name.trim().length < 2) {
      setMessage("❌ Full name must be at least 2 characters");
      return false;
    }
    if (!formData.age || formData.age < 5 || formData.age > 18) {
      setMessage("❌ Age must be between 5 and 18");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setMessage("❌ Invalid student email");
      return false;
    }
    if (formData.parentEmail && !emailRegex.test(formData.parentEmail)) {
      setMessage("❌ Invalid parent email");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Student added successfully!");
      setFormData({
        full_name: "",
        age: "",
        gender: "",
        notes: "",
        email: "",
        parentEmail: "",
        parentPhone: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer">
            <UserPlus size={24} />
            <span className="font-medium">Add New Student</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="5 - 18"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Student Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Parent Email
            </label>
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              placeholder="parent@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Parent Phone
            </label>
            <input
              type="text"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              placeholder="+252 61 1234567"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg shadow-sm font-medium transition-all"
          >
            {loading ? "Adding..." : "+ Add Student"}
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

export default AddStudentForm;
