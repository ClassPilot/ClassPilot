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
    <div className="p-6 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">Students</h2>
        <button className="bg-primary-blue hover:bg-interactive-hoverBlue text-white px-4 py-2 rounded-lg shadow transition">
          + Add Student
        </button>
      </div>

      <p className="text-neutral-600 mb-4">
        Manage your student roster and track progress
      </p>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-neutral-400" size={18} />
        <input
          type="text"
          placeholder="Search students..."
          className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg bg-background-input focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
      </div>

      {/* Students List */}
      <div className="grid md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-neutral-200 rounded-xl p-4 shadow hover:shadow-lg hover:bg-background-hover transition"
          >
            {/* Header with name & actions */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <User className="text-primary-purple" />
                  <h3 className="font-semibold text-neutral-900">{student.name}</h3>
                </div>
                <p className="text-xs text-neutral-500">{student.age}</p>
              </div>
              <div className="flex gap-3 text-neutral-400">
                <button>
                  <Edit size={18} className="hover:text-primary-blue" />
                </button>
                <button>
                  <Trash2 size={18} className="hover:text-semantic-error" />
                </button>
              </div>
            </div>

            {/* Info */}
            <p className="flex items-center gap-2 text-sm text-neutral-700 mb-2">
              <Mail size={14} className="text-primary-indigo" /> {student.email}
            </p>
            <p className="flex items-center gap-2 text-sm text-neutral-700 mb-2">
              <BookOpen size={14} className="text-primary-indigo" /> {student.grade}
            </p>
            <p className="text-sm text-neutral-700 mb-2">
              <span className="font-medium text-neutral-800">Gender:</span>{" "}
              {student.gender}
            </p>
            <p className="flex items-center gap-2 text-xs text-neutral-500">
              <Calendar size={14} /> Joined {student.joined}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;
