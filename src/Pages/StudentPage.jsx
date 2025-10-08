import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Mail,
  BookOpen,
  Calendar,
  Edit,
  Trash2,
  User,
} from "lucide-react";

function StudentsPage() {
  const [students] = useState([
    {
      id: 1,
      name: "Ali Mohamed",
      age: "9 years old",
      email: "ali.mohamed@student.edu",
      grade: "3rd Grade Mathematics",
      gender: "Male",
      joined: "1/9/2024",
    },
    {
      id: 2,
      name: "Amina Hassan",
      age: "10 years old",
      email: "amina.hassan@student.edu",
      grade: "4th Grade Science",
      gender: "Female",
      joined: "1/11/2024",
    },
    {
      id: 3,
      name: "Omar Abdi",
      age: "8 years old",
      email: "omar.abdi@student.edu",
      grade: "3rd Grade Reading",
      gender: "Male",
      joined: "1/14/2024",
    },
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Students</h2>
          <p className="text-gray-500">
            Manage your student roster and track progress
          </p>
        </div>
        <Link
          to="/add-student"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2"
        >
          + Add Student
        </Link>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Students List */}
      <div className="grid md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative"
          >
            {/* Top Right Actions (Edit / Delete) */}
            <div className="absolute top-4 right-4 flex gap-2 text-gray-400">
              <button className="hover:text-indigo-500 transition">
                <Edit size={18} />
              </button>
              <button className="hover:text-red-500 transition">
                <Trash2 size={18} />
              </button>
            </div>

            {/* Header (User Info) */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-violet-500 text-white p-2 rounded-lg">
                <User size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-xs text-gray-500">{student.age}</p>
              </div>
            </div>

            {/* Info */}
            <p className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <Mail size={14} className="text-indigo-500" /> {student.email}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <BookOpen size={14} className="text-indigo-500" /> {student.grade}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <span className="font-medium text-gray-800">Gender:</span>{" "}
              {student.gender}
            </p>

            {/* Bottom Section: Date (left) + View Details (right) */}
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <Calendar size={14} /> Joined {student.joined}
              </p>
              <a
                href="#"
                className="text-sky-600 text-sm font-medium hover:underline"
              >
                View Details →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;
