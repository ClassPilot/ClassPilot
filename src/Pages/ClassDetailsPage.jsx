import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Calendar } from "lucide-react";
import {
  fetchClassStudents,
  enrollStudentsInClass,
  removeStudentFromClass,
  fetchClasses,
} from "../Store/slices/classesSlice";
import {
  createGrade,
  updateGrade,
  deleteGrade,
  fetchGradesForClass,
} from "../Store/slices/gradesSlice";

// Small helper component: enroll list with search and per-student Add buttons
const EnrollStudentsList = ({
  students,
  enrolledStudents,
  selectedStudentIds,
  setSelectedStudentIds,
  enrollStudentsInClass,
  classId,
  dispatch,
  studentLoadingMap,
  setStudentLoadingMap,
  setEnrollMessage,
}) => {
  const [search, setSearch] = useState("");

  const available = students.filter(
    (s) => !enrolledStudents.some((es) => es._id === s._id)
  );

  const filtered = available.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search students by name or email"
        className="w-full border rounded p-2 mb-3"
      />

      <div className="max-h-56 overflow-auto space-y-2 mb-2">
        {filtered.map((s) => (
          <div
            key={s._id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gray-500">{s.email}</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedStudentIds.includes(s._id)}
                onChange={(e) => {
                  if (e.target.checked)
                    setSelectedStudentIds((a) => [...a, s._id]);
                  else
                    setSelectedStudentIds((a) =>
                      a.filter((id) => id !== s._id)
                    );
                }}
              />
              <button
                className="text-xs bg-indigo-500 text-white px-3 py-1 rounded disabled:opacity-50"
                disabled={!!studentLoadingMap[s._id]}
                onClick={async () => {
                  setStudentLoadingMap((m) => ({ ...m, [s._id]: true }));
                  const res = await dispatch(
                    enrollStudentsInClass({ classId, studentIds: [s._id] })
                  );
                  setStudentLoadingMap((m) => ({ ...m, [s._id]: false }));
                  if (!res.error) {
                    // refresh enrolled students list
                    dispatch(fetchClassStudents(classId));
                    setEnrollMessage("Student enrolled");
                  }
                }}
              >
                {studentLoadingMap[s._id] ? (
                  <div className="h-4 w-4 rounded-full border-2 border-transparent border-t-2 animate-spin bg-gradient-to-br from-violet-500 to-fuchsia-500 [mask-image:linear-gradient(white,white)]"></div>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={selectedStudentIds.length === 0}
          onClick={async () => {
            const res = await dispatch(
              enrollStudentsInClass({ classId, studentIds: selectedStudentIds })
            );
            if (!res.error) {
              // refresh enrolled students
              dispatch(fetchClassStudents(classId));
              setEnrollMessage("Students enrolled successfully!");
              setSelectedStudentIds([]);
            }
          }}
        >
          Enroll Selected ({selectedStudentIds.length})
        </button>
      </div>
    </div>
  );
};

const ClassDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Stable empty defaults to avoid selectors returning new references
  const EMPTY_ARRAY = [];
  const EMPTY_OBJECT = {};

  const cls = useSelector((state) =>
    state.classes.classes.find((c) => c._id === id)
  );
  const students = useSelector(
    (state) => state.students.students || EMPTY_ARRAY
  );
  const enrolledStudents = useSelector((state) => {
    const map = state.classes.classStudents;
    return map && map[id] ? map[id] : EMPTY_ARRAY;
  });
  const classGrades = useSelector(
    (state) => state.grades.classGrades || EMPTY_OBJECT
  );
  const loading = useSelector((state) => state.classes.loading);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [enrollMessage, setEnrollMessage] = useState("");
  const [removeMessage, setRemoveMessage] = useState("");
  const [gradeForm, setGradeForm] = useState({
    studentId: "",
    assignment: "",
    score: "",
  });
  const [gradeMessage, setGradeMessage] = useState("");
  const [studentLoadingMap, setStudentLoadingMap] = useState({});
  const [gradeLoadingMap, setGradeLoadingMap] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(fetchClassStudents(id));
      dispatch(fetchGradesForClass(id));
    }
  }, [id, dispatch]);

  // Ensure classes list exists so `cls` can be found
  useEffect(() => {
    if (!cls) {
      dispatch(fetchClasses());
    }
  }, [cls, dispatch]);

  // Show enroll success message
  useEffect(() => {
    if (enrollMessage) {
      const timer = setTimeout(() => setEnrollMessage(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [enrollMessage]);

  // Show remove success message
  useEffect(() => {
    if (removeMessage) {
      const timer = setTimeout(() => setRemoveMessage(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [removeMessage]);

  // Show grade success message
  useEffect(() => {
    if (gradeMessage) {
      const timer = setTimeout(() => setGradeMessage(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [gradeMessage]);

  if (!cls) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="h-12 w-12 mx-auto rounded-full border-4 border-transparent border-t-[4px] animate-spin bg-gradient-to-br from-violet-500 to-fuchsia-500 [mask-image:linear-gradient(white,white)]"></div>
        <p className="mt-4 text-gray-600">Loading class...</p>
      </div>
    );
  }

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
        <div className="space-y-3 text-gray-700 mb-6">
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

        {/* Enrolled Students as cards */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Enrolled Students</h3>
          {loading ? (
            <div>Loading students...</div>
          ) : enrolledStudents.length === 0 ? (
            <div className="text-gray-500">
              No students enrolled in this class.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {enrolledStudents.map((student) => {
                const gradesForStudent = (classGrades[cls._id] || []).filter(
                  (g) => g.studentId === student._id
                );
                return (
                  <div
                    key={student._id}
                    className="bg-white border rounded-lg p-4 shadow-sm flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.email}
                        </div>
                        {student.rollNumber && (
                          <div className="text-xs text-gray-400">
                            Roll: {student.rollNumber}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <button
                          className="text-xs text-red-500 hover:underline disabled:opacity-50"
                          disabled={!!studentLoadingMap[student._id]}
                          onClick={async () => {
                            if (!window.confirm("Remove student from class?"))
                              return;
                            setStudentLoadingMap((m) => ({
                              ...m,
                              [student._id]: true,
                            }));
                            const res = await dispatch(
                              removeStudentFromClass({
                                classId: cls._id,
                                studentId: student._id,
                              })
                            );
                            setStudentLoadingMap((m) => ({
                              ...m,
                              [student._id]: false,
                            }));
                            if (!res.error)
                              setRemoveMessage("Student removed successfully!");
                          }}
                        >
                          {studentLoadingMap[student._id] ? (
                            <div className="h-4 w-4 rounded-full border-2 border-transparent border-t-2 animate-spin bg-gradient-to-br from-violet-500 to-fuchsia-500 [mask-image:linear-gradient(white,white)]"></div>
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Grades
                      </div>
                      {gradesForStudent.length === 0 ? (
                        <div className="text-xs text-gray-500">
                          No grades yet.
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {gradesForStudent.map((grade) => (
                            <li
                              key={grade._id}
                              className="flex items-center justify-between text-sm"
                            >
                              <div>
                                <div className="font-medium">
                                  {grade.assignment}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Score: {grade.score}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  className="text-xs text-blue-500 hover:underline disabled:opacity-50"
                                  disabled={!!gradeLoadingMap[grade._id]}
                                  onClick={async () => {
                                    const newScore = prompt(
                                      "Edit score",
                                      grade.score
                                    );
                                    if (newScore === null) return;
                                    setGradeLoadingMap((m) => ({
                                      ...m,
                                      [grade._id]: true,
                                    }));
                                    const res = await dispatch(
                                      updateGrade({
                                        id: grade._id,
                                        updatedData: {
                                          score: Number(newScore),
                                        },
                                      })
                                    );
                                    setGradeLoadingMap((m) => ({
                                      ...m,
                                      [grade._id]: false,
                                    }));
                                    if (!res.error)
                                      setGradeMessage("Grade updated");
                                  }}
                                >
                                  {gradeLoadingMap[grade._id] ? (
                                    <div className="h-3 w-3 rounded-full border-2 border-transparent border-t-2 animate-spin bg-gradient-to-br from-violet-500 to-fuchsia-500 [mask-image:linear-gradient(white,white)]"></div>
                                  ) : (
                                    "Edit"
                                  )}
                                </button>
                                <button
                                  className="text-xs text-red-500 hover:underline disabled:opacity-50"
                                  disabled={!!gradeLoadingMap[grade._id]}
                                  onClick={async () => {
                                    if (!window.confirm("Delete this grade?"))
                                      return;
                                    setGradeLoadingMap((m) => ({
                                      ...m,
                                      [grade._id]: true,
                                    }));
                                    const res = await dispatch(
                                      deleteGrade(grade._id)
                                    );
                                    setGradeLoadingMap((m) => ({
                                      ...m,
                                      [grade._id]: false,
                                    }));
                                    if (!res.error)
                                      setGradeMessage("Grade deleted");
                                  }}
                                >
                                  {gradeLoadingMap[grade._id] ? (
                                    <div className="h-3 w-3 rounded-full border-2 border-transparent border-t-2 animate-spin bg-gradient-to-br from-violet-500 to-fuchsia-500 [mask-image:linear-gradient(white,white)]"></div>
                                  ) : (
                                    "Delete"
                                  )}
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Quick add grade inline */}
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const assignment = form.assignment?.value?.trim();
                        const score = form.score?.value?.trim();
                        if (!assignment || !score) return;
                        setStudentLoadingMap((m) => ({
                          ...m,
                          [student._id]: true,
                        }));
                        const res = await dispatch(
                          createGrade({
                            student_id: student._id,
                            class_id: cls._id,
                            assignment,
                            score: Number(score),
                          })
                        );
                        setStudentLoadingMap((m) => ({
                          ...m,
                          [student._id]: false,
                        }));
                        if (!res.error) {
                          setGradeMessage("Grade added");
                          form.reset();
                        } else {
                          setGradeMessage("Failed to add grade");
                        }
                      }}
                    >
                      <div className="flex gap-2">
                        <input
                          name="assignment"
                          placeholder="Assignment"
                          className="flex-1 border rounded p-2 text-sm"
                          disabled={!!studentLoadingMap[student._id]}
                        />
                        <input
                          name="score"
                          type="number"
                          min={0}
                          max={100}
                          placeholder="Score"
                          className="w-20 border rounded p-2 text-sm"
                          disabled={!!studentLoadingMap[student._id]}
                        />
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                          disabled={!!studentLoadingMap[student._id]}
                        >
                          {studentLoadingMap[student._id] ? (
                            <div className="h-3 w-3 rounded-full border-2 border-transparent border-t-2 animate-spin bg-gradient-to-br from-violet-500 to-fuchsia-500 [mask-image:linear-gradient(white,white)]"></div>
                          ) : (
                            "Add"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                );
              })}
            </div>
          )}
          {removeMessage && (
            <div className="text-green-600 text-xs mt-2">{removeMessage}</div>
          )}
        </div>

        {/* Enroll Students */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Enroll Students</h3>
          <p className="text-sm text-gray-500 mb-2">
            Search and add students to this class.
          </p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Search students by name or email"
              value={"" /* controlled below via enrollSearch state */}
              onChange={() => {}}
              className="hidden"
            />
          </div>
          {/* Simple client-side search + list */}
          <EnrollStudentsList
            students={students}
            enrolledStudents={enrolledStudents}
            selectedStudentIds={selectedStudentIds}
            setSelectedStudentIds={setSelectedStudentIds}
            enrollStudentsInClass={enrollStudentsInClass}
            classId={cls._id}
            dispatch={dispatch}
            studentLoadingMap={studentLoadingMap}
            setStudentLoadingMap={setStudentLoadingMap}
            setEnrollMessage={setEnrollMessage}
          />
          {enrollMessage && (
            <div className="text-green-600 text-xs mt-2">{enrollMessage}</div>
          )}
        </div>

        {/* Add Grade Form */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Add Grade</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                gradeForm.studentId &&
                gradeForm.assignment &&
                gradeForm.score
              ) {
                const result = await dispatch(
                  createGrade({
                    student_id: gradeForm.studentId,
                    class_id: cls._id,
                    assignment: gradeForm.assignment,
                    score: Number(gradeForm.score),
                  })
                );
                if (!result.error) {
                  setGradeMessage("Grade added successfully!");
                  setGradeForm({ studentId: "", assignment: "", score: "" });
                } else {
                  setGradeMessage("Failed to add grade.");
                }
              }
            }}
          >
            <select
              value={gradeForm.studentId}
              onChange={(e) =>
                setGradeForm((f) => ({ ...f, studentId: e.target.value }))
              }
              className="w-full border rounded p-2 mb-2"
            >
              <option value="">Select student</option>
              {enrolledStudents.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Assignment"
              value={gradeForm.assignment}
              onChange={(e) =>
                setGradeForm((f) => ({ ...f, assignment: e.target.value }))
              }
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="number"
              placeholder="Score (0-100)"
              value={gradeForm.score}
              onChange={(e) =>
                setGradeForm((f) => ({ ...f, score: e.target.value }))
              }
              className="w-full border rounded p-2 mb-2"
              min={0}
              max={100}
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add Grade
            </button>
          </form>
          {gradeMessage && (
            <div className="text-green-600 text-xs mt-2">{gradeMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassDetailsPage;
