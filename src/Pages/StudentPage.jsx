import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Mail,
  BookOpen,
  Calendar,
  Edit,
  Trash2,
  User,
  GraduationCap,
} from "lucide-react";
import { fetchStudents, deleteStudent } from "../Store/slices/StudentSlice";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector((state) => state.students);

  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    const result = await dispatch(deleteStudent(id));
    if (!result.error) {
      setSuccessMessage("✅ Student deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setSuccessMessage("❌ Failed to delete student.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  // --- Filter students by search term ---
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade?.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-indigo-500">
          <GraduationCap size={48} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchStudents())}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4 text-indigo-400">
          <User size={64} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Students Yet
        </h2>
        <p className="text-gray-500 mb-6">
          Add your first student to get started
        </p>
        <Link
          to="/add-student"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
        >
          + Add Student
        </Link>
      </div>
    );
  }

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
          placeholder="Search by name, email, or grade..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Students grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative"
            >
              {/* Edit / Delete */}
              <div className="absolute top-4 right-4 flex gap-2 text-gray-400">
                <button
                  onClick={() => handleEdit(student._id)}
                  className="hover:text-indigo-500 transition"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-violet-500 text-white p-2 rounded-lg">
                  <User size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {student.name}
                  </h3>
                  <p className="text-xs text-gray-500">{student.age}</p>
                </div>
              </div>

              {/* Info */}
              <p className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <Mail size={14} className="text-indigo-500" /> {student.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <BookOpen size={14} className="text-indigo-500" />{" "}
                {student.grade}
              </p>
              <p className="text-sm text-gray-700 mb-4">
                <span className="font-medium text-gray-800">Gender:</span>{" "}
                {student.gender}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <Calendar size={14} /> Joined {student.joined}
                </p>
                <Link
                  to={`/students/${student._id}`}
                  className="text-sky-600 text-sm font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No students match your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
