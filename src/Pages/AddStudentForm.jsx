import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { studentSchema } from "../Schema/StudentSchema";
import { useDispatch } from "react-redux";
import { addStudent } from "../Store/slices/StudentSlice";

function AddStudentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loading, error } = useSelector((state) => state.);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      full_name: "",
      age: undefined,
      grade: undefined,
      gender: "",
      notes: "",
      email: "",
      parentEmail: "",
      parentPhone: "",
    },
  });

  const onSubmit = async (data) => {
    // ✅ Map frontend fields to backend expected fields
    const payload = {
      name: data.full_name, // backend expects "name"
      age: data.age,
      gender: data.gender,
      grade: Number(data.grade),
      notes: data.notes,
      email: data.email,
      parent_email: data.parentEmail,
      parent_phone: data.parentPhone,
    };

    const result = await dispatch(addStudent(payload));

    if (addStudent.fulfilled.match(result)) {
      reset();
      navigate("/students");
    } else {
      console.error("Failed to add student:", result.error);
    }
    console.log("Form Data:", data);
    await new Promise((r) => setTimeout(r, 1000));
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
            <UserPlus size={24} />
            <span className="font-medium">Add New Student</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("full_name")}
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. John Doe"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              placeholder="5 - 18"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Grade <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("grade", { valueAsNumber: true })} // ✅ ensures number type
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 6"
            />
            {errors.grade && (
              <p className="text-red-500 text-sm mt-1">
                {errors.grade.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notes
            </label>
            <textarea
              {...register("notes")}
              rows="3"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Student Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="student@example.com"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Parent Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Parent Email
            </label>
            <input
              type="email"
              {...register("parentEmail")}
              placeholder="parent@example.com"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.parentEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.parentEmail.message}
              </p>
            )}
          </div>

          {/* Parent Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Parent Phone
            </label>
            <input
              type="text"
              {...register("parentPhone")}
              placeholder="+252 61 1234567"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg shadow-sm font-medium transition-all"
          >
            {isSubmitting ? "Adding..." : "+ Add Student"}
          </button>

          {isSubmitSuccessful && (
            <p className="mt-5 text-center text-green-600 text-sm font-medium">
              ✅ Student added successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddStudentForm;
