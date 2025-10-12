import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, fetchStudents } from "../Store/slices/StudentSlice";
import { User, Mail, BookOpen } from "lucide-react";

const EditStudentForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students } = useSelector((state) => state.students);

  const student = students.find((s) => s._id === id);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: student || {},
  });
  useEffect(() => {
    if (student) {
      reset({
        name: student.name,
        age: student.age,
        grade: student.grade,
        gender: student.gender,
        notes: student.notes,
        email: student.email,
        parentEmail: student.parentEmail, // camelCase from backend
        parentPhone: student.parentPhone, // camelCase from backend
      });
    } else {
      dispatch(fetchStudents());
    }
  }, [student, dispatch, reset]);

  const onSubmit = async (data) => {
    await dispatch(updateStudent({ id, updatedData: data }));
    navigate("/students");
  };

  if (!student)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading student...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-500 text-white px-3 py-2 rounded-lg shadow-sm flex items-center gap-2">
            <User size={24} />
            <span className="font-medium">Edit Student</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            {...register("age")}
            type="number"
            placeholder="Age"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            {...register("grade")}
            placeholder="Grade"
            type="number"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <select
            {...register("gender")}
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            {...register("email")}
            type="email"
            placeholder="Student Email"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            {...register("parentEmail")} // camelCase
            type="email"
            placeholder="Parent Email"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />

          <input
            {...register("parentPhone")} // camelCase
            placeholder="Parent Phone"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            {...register("notes")}
            placeholder="Notes"
            rows={3}
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg shadow-sm transition-all"
            >
              Update Student
            </button>
            <button
              type="button"
              onClick={() => navigate("/students")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg shadow-sm transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentForm;
