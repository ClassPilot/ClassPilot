import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../Store/slices/classesSlice";
import { BookOpen, Calendar } from "lucide-react";

const ClassDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classes);

  useEffect(() => {
    if (!classes.length) dispatch(fetchClasses());
  }, [dispatch, classes.length]);

  const cls = classes.find((c) => c._id === id);

  if (!cls)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading class...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/classes")}
          className="mb-6 text-indigo-500 hover:text-indigo-600 font-medium"
        >
          ← Back to Classes
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-indigo-500 text-white p-3 rounded-lg">
            <BookOpen size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{cls.name}</h2>
        </div>

        {/* Class Info */}
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Description:</strong> {cls.description}
          </p>
          <p>
            <strong>Subject:</strong> {cls.subject}
          </p>
          <p>
            <strong>Grade Level:</strong> {cls.gradeLevel}
          </p>
          <p>
            <strong>Capacity:</strong> {cls.capacity} students
          </p>
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={16} /> {cls.schedule}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
