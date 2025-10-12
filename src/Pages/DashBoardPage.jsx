import React, { useEffect, useState } from "react";
import { Users, BookOpen, Clock, TrendingUp, Bell, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../Store/slices/StudentSlice";
import { fetchClasses } from "../Store/slices/classesSlice";
// import { toast } from "react-toastify";

function DashboardPage() {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    title: "",
    desc: "",
    due: "",
  });
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { classes } = useSelector((state) => state.classes);

  // === FETCH STUDENTS AND CLASSES ===
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClasses());
  }, [dispatch]);

  // === LOAD REMINDERS FROM LOCALSTORAGE ===
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(savedReminders);
  }, []);

  // === SAVE REMINDERS TO LOCALSTORAGE ===
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // === ADD NEW REMINDER ===
  const addReminder = () => {
    if (!newReminder.title || !newReminder.due) {
      toast.warn("Please fill in a title and due date!");
      return;
    }
    const reminder = {
      id: Date.now(),
      ...newReminder,
      priority: "medium",
      createdAt: new Date().toISOString(),
    };
    setReminders((prev) => [...prev, reminder]);
    setNewReminder({ title: "", desc: "", due: "" });
    toast.success("Reminder added successfully!");
  };

  // === DELETE REMINDER ===
  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    toast.success("Reminder deleted!");
  };

  // === DYNAMIC NOTIFICATIONS ===
  useEffect(() => {
    const notifList = [];
    if (students.length > 0) {
      notifList.push({
        id: 1,
        message: `${students[students.length - 1].name} joined Grade ${
          students[students.length - 1].grade
        }`,
        time: new Date(
          students[students.length - 1].createdAt
        ).toLocaleString(),
      });
    }
    reminders.forEach((r) =>
      notifList.push({
        id: r.id,
        message: `Reminder: ${r.title} (due ${r.due})`,
        time: new Date(r.createdAt).toLocaleString(),
      })
    );
    setNotifications(notifList.slice(-5));
  }, [students, reminders]);

  // === STATS CALCULATIONS ===
  const totalStudents = students?.length || 0;
  const totalClasses = classes?.length || 0;
  const averageGrade =
    students.length > 0
      ? (
          students.reduce((sum, s) => sum + (s.grade || 0), 0) / students.length
        ).toFixed(1)
      : 0;
  const attendanceRate = Math.floor(Math.random() * 10 + 90);
  const assignmentsCompleted = Math.floor(Math.random() * 10 + 85);
  const overallPerformance = Math.floor(
    (attendanceRate + assignmentsCompleted + Number(averageGrade)) / 3
  );

  return (
    <div className="m-4">
      {/* ===== TOP CARDS ===== */}
      <div className="flex gap-3 items-center flex-wrap">
        <SummaryCard
          title="Total Students"
          value={totalStudents}
          subtitle="Across all classes"
          icon={<Users size={24} />}
          color="from-blue-500 to-blue-600"
        />
        <SummaryCard
          title="My Classes"
          value={totalClasses}
          subtitle="Active this semester"
          icon={<BookOpen size={24} />}
          color="from-purple-500 to-purple-600"
        />
        <SummaryCard
          title="Reminders"
          value={reminders.length}
          subtitle="Pending tasks"
          icon={<Clock size={24} />}
          color="from-orange-500 to-orange-600"
        />
        <SummaryCard
          title="Performance"
          value={`${overallPerformance}%`}
          subtitle="Overall progress"
          icon={<TrendingUp size={24} />}
          color="from-green-500 to-green-600"
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* ===== LEFT COLUMN ===== */}
        <div className="flex-1 flex flex-col gap-6">
          <QuickActions />
          <RecentActivity students={students} />
          <ClassOverview classes={classes} />
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow p-3">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>

          <Notifications notifications={notifications} />

          <UpcomingReminders
            reminders={reminders}
            newReminder={newReminder}
            setNewReminder={setNewReminder}
            addReminder={addReminder}
            deleteReminder={deleteReminder}
          />

          <PerformanceSummary
            averageGrade={averageGrade}
            attendanceRate={attendanceRate}
            assignmentsCompleted={assignmentsCompleted}
            overall={overallPerformance}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const SummaryCard = ({ title, value, subtitle, icon, color }) => (
  <div
    className={`bg-gradient-to-br ${color} text-white rounded-2xl p-4 w-60 shadow-md`}
  >
    <div className="flex items-center justify-between">
      <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
    </div>
    <div className="mt-4">
      <h4 className="text-sm opacity-90">{title}</h4>
      <h2 className="text-3xl font-bold">{value}</h2>
      <span className="text-xs opacity-80">{subtitle}</span>
    </div>
  </div>
);

const QuickActions = () => (
  <div className="bg-white rounded-2xl shadow p-4">
    <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        to="/add-student"
        className="flex-1 bg-blue-600 text-white text-center py-3 font-bold rounded-lg hover:bg-blue-700 transition"
      >
        + Add New Student
      </Link>
      <Link
        to="/add-class"
        className="flex-1 bg-purple-600 text-white text-center py-3 font-bold rounded-lg hover:bg-purple-700 transition"
      >
        + Create New Class
      </Link>
    </div>
  </div>
);

const RecentActivity = ({ students }) => (
  <div className="bg-white rounded-2xl shadow p-5">
    <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
    <div className="space-y-3">
      {students.slice(-3).map((student) => (
        <div
          key={student._id}
          className="flex items-start gap-3 bg-gray-50 p-3 rounded-2xl border"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-[16px] font-medium">{student.name}</h3>
            <p className="text-[14px] text-gray-500">
              Joined Grade {student.grade}
            </p>
            <span className="text-xs text-gray-400">
              {new Date(student.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClassOverview = ({ classes }) => (
  <div className="bg-white rounded-2xl shadow p-4">
    <h3 className="text-lg font-semibold mb-3">Class Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {classes.slice(0, 4).map((cls) => (
        <div key={cls._id} className="bg-amber-100 rounded-xl p-3">
          <div className="flex gap-2 items-center">
            <div className="bg-gradient-to-br from-amber-500 to-red-500 w-10 h-10 flex items-center justify-center rounded-lg">
              <BookOpen className="text-white" size={20} />
            </div>
            <div>
              <h4 className="font-bold">{cls.name}</h4>
              <p>{cls.capacity} Students</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1">{cls.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const Notifications = ({ notifications }) => (
  <div className="bg-white rounded-2xl shadow p-5">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Bell size={18} /> Notifications
      </h3>
    </div>
    <ul className="space-y-3">
      {notifications.map((n) => (
        <li key={n.id} className="border p-2 rounded-lg bg-gray-50">
          <p className="text-sm">{n.message}</p>
          <span className="text-xs text-gray-400">{n.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

const UpcomingReminders = ({
  reminders,
  newReminder,
  setNewReminder,
  addReminder,
  deleteReminder,
}) => (
  <div className="bg-white rounded-2xl shadow p-5">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
    </div>
    <div className="space-y-3 mb-3">
      <input
        type="text"
        placeholder="Title"
        value={newReminder.title}
        onChange={(e) =>
          setNewReminder({ ...newReminder, title: e.target.value })
        }
        className="w-full border rounded-lg p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Description"
        value={newReminder.desc}
        onChange={(e) =>
          setNewReminder({ ...newReminder, desc: e.target.value })
        }
        className="w-full border rounded-lg p-2 text-sm"
      />
      <input
        type="date"
        value={newReminder.due}
        onChange={(e) =>
          setNewReminder({ ...newReminder, due: e.target.value })
        }
        className="w-full border rounded-lg p-2 text-sm"
      />
      <button
        onClick={addReminder}
        className="bg-blue-600 text-white text-sm font-semibold w-full rounded-lg py-2 hover:bg-blue-700 transition"
      >
        + Add Reminder
      </button>
    </div>
    <ul className="space-y-3">
      {reminders.map((r) => (
        <li key={r.id} className="bg-gray-50 rounded-xl p-4 border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold">{r.title}</h4>
              <p className="text-sm text-gray-500">{r.desc}</p>
              <p className="text-xs text-gray-400 mt-1">Due: {r.due}</p>
            </div>
            <button
              onClick={() => deleteReminder(r.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const PerformanceSummary = ({
  averageGrade,
  attendanceRate,
  assignmentsCompleted,
  overall,
}) => (
  <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-center gap-4">
    <h3 className="text-lg font-semibold w-full">Performance Summary</h3>
    <div className="w-full flex justify-between text-sm text-gray-700">
      <p>Average Grade</p>
      <p className="font-medium">{averageGrade}</p>
    </div>
    <div className="w-full flex justify-between text-sm text-gray-700">
      <p>Attendance Rate</p>
      <p className="font-medium">{attendanceRate}%</p>
    </div>
    <div className="w-full flex justify-between text-sm text-gray-700">
      <p>Assignments Completed</p>
      <p className="font-medium">{assignmentsCompleted}%</p>
    </div>
    <div className="mt-4 flex flex-col items-center">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20">
          <circle
            className="text-gray-200"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
          />
          <circle
            className="text-purple-500"
            strokeWidth="6"
            strokeDasharray="226.195"
            strokeDashoffset={226.195 * (1 - overall / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="36"
            cx="40"
            cy="40"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">
          {overall}%
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">Overall</p>
    </div>
  </div>
);

export default DashboardPage;
