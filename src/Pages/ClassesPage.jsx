import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  Calendar,
  BookOpen,
  Trash2,
  Edit,
  School,
} from "lucide-react";
import { fetchClasses, deleteClass } from "../Store/slices/classesSlice";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { classes, loading, error } = useSelector((state) => state.classes);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    const result = await dispatch(deleteClass(id));
    if (!result.error) {
      setSuccessMessage("✅ Class deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setSuccessMessage("❌ Failed to delete class.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // --- Filter classes by search term ---
  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-indigo-500">
          <School size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchClasses())}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4 text-indigo-400">
          <BookOpen size={64} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Classes Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Create your first class to get started
        </p>
        <Link
          to="/add-class"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          + Create Class
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Classes</h2>
          <p className="text-gray-500">
            Manage your class roster and curriculum
          </p>
        </div>
        <Link
          to="/add-class"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2"
        >
          + Create Class
        </Link>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
          {successMessage}
        </div>
      )}

      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search classes by name, description, or subject..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Classes grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative"
            >
              {/* Edit / Delete */}
              <div className="absolute top-4 right-4 flex gap-2 text-gray-400">
                <Link
                  to={`/classes/edit/${cls._id}`}
                  className="hover:text-indigo-500 transition"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-4 mt-1">
                <div className="bg-violet-500 text-white p-2 rounded-lg">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Users size={14} /> {cls.capacity} students
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 leading-snug">
                {cls.description}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <Calendar size={14} /> {cls.schedule}
                </p>
                <Link
                  to={`/classes/${cls._id}`}
                  className="text-sky-600 text-sm font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No classes match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassesPage;
