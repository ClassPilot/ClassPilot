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
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Classes</h2>
          <p className="text-gray-500">Manage your class roster and curriculum</p>
        </div>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2">
          + Create Class
        </button>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search classes..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Classes List */}
      <div className="grid md:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
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

            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-4 mt-1">
              <div className="bg-violet-500 text-white p-2 rounded-lg">
                <BookOpen size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Users size={14} /> {cls.students} students
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 leading-snug">{cls.description}</p>

            {/* Bottom Section: Date (left) + View Details (right) */}
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <Calendar size={14} /> {cls.date}
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

export default ClassesPage;
