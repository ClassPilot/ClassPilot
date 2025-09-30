import { useState } from "react";
import { Search, Mail, BookOpen, Calendar, Edit, Trash2, User } from "lucide-react";

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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Students</h2>
        <button className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg shadow hover:bg-fuchsia-700">
          + Add Student
        </button>
      </div>

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
            {/* Header with name & actions */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <User className="text-fuchsia-600" />
                  <h3 className="font-semibold">{student.name}</h3>
                </div>
                <p className="text-xs text-gray-500">{student.age}</p>
              </div>
              <div className="flex gap-3 text-gray-400">
                <button>
                  <Edit size={18} className="hover:text-fuchsia-600" />
                </button>
                <button>
                  <Trash2 size={18} className="hover:text-red-600" />
                </button>
              </div>
            </div>

            {/* Info */}
            <p className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Mail size={14} className="text-gray-400" /> {student.email}
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <BookOpen size={14} className="text-gray-400" /> {student.grade}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Gender:</span> {student.gender}
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar size={14} /> Joined {student.joined}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;
