import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateClass, fetchClasses } from "../Store/slices/classesSlice";
import { BookOpen } from "lucide-react";

const EditClassForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes } = useSelector((state) => state.classes);

  const cls = classes.find((c) => c._id === id);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: cls || {},
  });

  useEffect(() => {
    if (cls) {
      reset({
        name: cls.name,
        description: cls.description,
        subject: cls.subject,
        gradeLevel: cls.gradeLevel,
        schedule: cls.schedule,
        capacity: cls.capacity,
      });
    } else {
      dispatch(fetchClasses());
    }
  }, [cls, dispatch, reset]);

  const onSubmit = async (data) => {
    await dispatch(updateClass({ id, updatedData: data }));
    navigate("/classes");
  };

  if (!cls)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading class...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-500 text-white px-3 py-2 rounded-lg shadow-sm flex items-center gap-2">
            <BookOpen size={24} />
            <span className="font-medium">Edit Class</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name")}
            placeholder="Class Name"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            {...register("subject")}
            placeholder="Subject"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            {...register("gradeLevel")}
            type="number"
            placeholder="Grade Level"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            {...register("capacity")}
            type="number"
            placeholder="Capacity"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            {...register("schedule")}
            placeholder="Schedule"
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            {...register("description")}
            placeholder="Description"
            rows={3}
            className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg shadow-sm transition-all"
            >
              Update Class
            </button>
            <button
              type="button"
              onClick={() => navigate("/classes")}
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

export default EditClassForm;
