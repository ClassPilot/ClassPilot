import { useState } from "react";
import { Search, Users, Calendar, BookOpen, Trash2, Edit } from "lucide-react";

function ClassesPage() {
  const [classes] = useState([
    {
      id: 1,
      title: "3rd Grade Mathematics",
      students: 3,
      date: "1/9/2024",
      description:
        "Advanced mathematics for 3rd grade students focusing on multiplication, division and problem solving.",
    },
    {
      id: 2,
      title: "4th Grade Science",
      students: 2,
      date: "1/11/2024",
      description:
        "Exploring the natural world through hands-on experiments and observations.",
    },
    {
      id: 3,
      title: "3rd Grade Reading",
      students: 1,
      date: "1/14/2024",
      description:
        "Building reading comprehension and vocabulary through engaging literature.",
    },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Classes</h2>
        <button className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg shadow hover:bg-fuchsia-700">
          + Create Class
        </button>
      </div>

      <p className="text-gray-500 mb-4">
        Manage your class roster and curriculum
      </p>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search classes..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
      </div>

      {/* Classes List */}
      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-fuchsia-600" />
              <h3 className="font-semibold">{cls.title}</h3>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
              <Users size={16} /> {cls.students} students
            </p>
            <p className="text-gray-600 text-sm mb-3">{cls.description}</p>
            <p className="text-xs text-gray-400 flex items-center gap-2 mb-3">
              <Calendar size={14} /> {cls.date}
            </p>
            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-fuchsia-600 text-sm font-medium hover:underline"
              >
                View Details →
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

export default ClassesPage;
