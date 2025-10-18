import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Store/slices/StudentSlice";
import { fetchGradesForClass } from "../Store/slices/gradesSlice";
import { User, Mail, BookOpen, Calendar, Star } from "lucide-react";

const StudentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const classes = useSelector((state) => state.classes.classes || []);
  const classStudentsMap = useSelector(
    (state) => state.classes.classStudents || {}
  );
  const classGrades = useSelector((state) => state.grades.classGrades || {});

  const student = students.find((s) => s._id === id);

  useEffect(() => {
    if (!students.length) dispatch(fetchStudents());
  }, [dispatch, students.length]);

  // Fetch grades for all classes the student belongs to
  useEffect(() => {
    if (!student) return;
    (classes || []).forEach((c) => {
      const studentsForClass = classStudentsMap[c._id] || [];
      const belongs = studentsForClass.some((s) => s._id === id);
      if (belongs) {
        dispatch(fetchGradesForClass(c._id));
      }
    });
  }, [student, classes, classStudentsMap, dispatch, id]);

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
          {/* Classes tags and grades */}
          <div className="mb-4">
            {(classes || []).map((c) => {
              const studentsForClass = classStudentsMap[c._id] || [];
              const belongs = studentsForClass.some(
                (s) => s._id === student._id
              );
              if (!belongs) return null;
              // Find grades for this student in this class
              const grades = (classGrades[c._id] || []).filter(
                (g) => g.studentId === student._id
              );
              console.log(
                "Class:",
                c.name,
                "Student:",
                student.name,
                "Grades:",
                grades
              );
              return (
                <div key={c._id} className="mb-2">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full mr-2">
                    {c.name}
                  </span>
                  {grades.length > 0 ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Grades:
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      No grades yet
                    </span>
                  )}
                  {grades.length > 0 && (
                    <ul className="ml-4 mt-1">
                      {grades.map((g) => (
                        <li
                          key={g._id}
                          className="text-xs flex items-center gap-2 mb-1"
                        >
                          <Star size={12} className="text-yellow-500" />
                          <span className="font-medium">
                            {g.assignment}:
                          </span>{" "}
                          <span>{g.score}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
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
