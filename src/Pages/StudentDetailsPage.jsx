import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Store/slices/StudentSlice";
import { User, Mail, BookOpen, Calendar } from "lucide-react";

const StudentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    if (!students.length) dispatch(fetchStudents());
  }, [dispatch, students.length]);

  const student = students.find((s) => s._id === id);

  if (!student)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading student...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/students")}
          className="mb-6 text-indigo-500 hover:text-indigo-600 font-medium"
        >
          ← Back to Students
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-indigo-500 text-white p-3 rounded-lg">
            <User size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
        </div>

        {/* Student Info */}
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Age:</strong> {student.age}
          </p>
          <p>
            <strong>Grade:</strong> {student.grade}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} className="text-indigo-500" /> {student.email}
          </p>
          <p>
            <strong>Parent Email:</strong> {student.parentEmail}
          </p>
          <p>
            <strong>Parent Phone:</strong> {student.parentPhone}
          </p>
          <p>
            <strong>Notes:</strong> {student.notes}
          </p>
          <p className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={16} /> Joined {student.joined}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
