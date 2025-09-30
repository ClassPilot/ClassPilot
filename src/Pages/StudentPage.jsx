import { useState } from "react";
import { Search, User, Calendar, BookOpen, Trash2, Edit } from "lucide-react";

function StudentsPage() {
  const [students] = useState([
    {
      id: 1,
      name: "Ali Mohamed",
      grade: "3rd Grade",
      joined: "1/9/2024",
      notes: "Excellent in mathematics, needs improvement in reading.",
    },
    {
      id: 2,
      name: "Amina Hassan",
      grade: "4th Grade",
      joined: "1/11/2024",
      notes: "Shows strong interest in science and experiments.",
    },
    {
      id: 3,
      name: "Omar Abdi",
      grade: "3rd Grade",
      joined: "1/14/2024",
      notes: "Very active in class discussions, needs focus on homework.",
    },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
        <button className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg shadow hover:bg-fuchsia-700">
          + Add Student
        </button>
      </div>

      <p className="text-gray-500 mb-4">
        Manage your student roster and track progress
      </p>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
      </div>

      {/* Students List */}
      <div className="grid md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <User className="text-fuchsia-600" />
              <h3 className="font-semibold">{student.name}</h3>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
              <BookOpen size={16} /> {student.grade}
            </p>
            <p className="text-gray-600 text-sm mb-3">{student.notes}</p>
            <p className="text-xs text-gray-400 flex items-center gap-2 mb-3">
              <Calendar size={14} /> Joined {student.joined}
            </p>
            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-fuchsia-600 text-sm font-medium hover:underline"
              >
                View Profile →
              </a>
              <div className="flex gap-3 text-gray-400">
                <button>
                  <Edit size={18} className="hover:text-fuchsia-600" />
                </button>
                <button>
                  <Trash2 size={18} className="hover:text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;
