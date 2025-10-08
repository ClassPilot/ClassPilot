import { BookOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classSchema } from "../Schema/ClassesScheme";

function AddClassForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      subject: "",
      grade_level: "",
      schedule: "",
      capacity: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    await new Promise((r) => setTimeout(r, 1000));
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-violet-500 text-white p-2 rounded-lg">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Class</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Class Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
              placeholder="e.g. Algebra 1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              {...register("subject")}
              placeholder="e.g. Mathematics"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Grade Level & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Grade Level
              </label>
              <input
                type="number"
                {...register("grade_level", { valueAsNumber: true })}
                placeholder="1 - 12"
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
              />
              {errors.grade_level && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.grade_level.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Capacity
              </label>
              <input
                type="number"
                {...register("capacity", { valueAsNumber: true })}
                placeholder="Max students"
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
              />
              {errors.capacity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Schedule
            </label>
            <input
              type="text"
              {...register("schedule")}
              placeholder="e.g. Mon, Wed - 10:00 AM"
              className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg shadow-sm font-medium transition-all"
          >
            {isSubmitting ? "Creating..." : "+ Add Class"}
          </button>

          {isSubmitSuccessful && (
            <p className="mt-5 text-center text-green-600 text-sm font-medium">
              ✅ Class created successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddClassForm;
