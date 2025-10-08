import { Users, BookOpen, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
function DashBoardPage() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="m-4 ">
      <div className="flex gap-3 items-center">
        {/* Total Students Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-4 w-60 shadow-md">
          <div className="flex items-center justify-betweenit">
            <div className="bg-white/20 p-2 rounded-lg">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm opacity-90">Total Students</h4>
            <h2 className="text-3xl font-bold">6</h2>
            <span className="text-xs opacity-80">Across all classes</span>
          </div>
        </div>

        {/* My Classes Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-4 w-60 shadow-md">
          <div className="flex items-center justify-between">
            <div className="bg-white/20 p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm opacity-90">My Classes</h4>
            <h2 className="text-3xl font-bold">3</h2>
            <span className="text-xs opacity-80">Active this semester</span>
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-4 w-60 shadow-md">
          <div className="flex items-center justify-between">
            <div className="bg-white/20 p-2 rounded-lg">
              <Clock size={24} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm opacity-90">Pending Tasks</h4>
            <h2 className="text-3xl font-bold">3</h2>
            <span className="text-xs opacity-80">Need attention</span>
          </div>
        </div>

        {/* Class Average Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-4 w-60 shadow-md">
          <div className="flex items-center justify-between">
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm opacity-90">Class Average</h4>
            <h2 className="text-3xl font-bold">85%</h2>
            <span className="text-xs opacity-80">This semester</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* ===== Left Column (Main Content) ===== */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/add-student"
                className="flex-1 bg-blue-600 text-white text-center py-3 font-bold text-[16px] rounded-lg hover:bg-blue-700 transition"
              >
                + Add New Student
              </Link>
              <Link
                to="/add-class"
                className="flex-1 bg-purple-600 text-white text-center py-3 font-bold text-[16px]  rounded-lg hover:bg-purple-700 transition"
              >
                + Create New Class
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <button className="text-blue-500 text-sm hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-[#f6f6f6] p-3 rounded-2xl">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg">
                  <Users size={24} className="text-white " />
                </div>
                <div>
                  <h3 className="text-[20px] font-medium">
                    New Student Enrolled
                  </h3>
                  <p className="text-[18px] text-gray-500">
                    Ethan Johnson joined 3rd Grade Reading ·
                  </p>
                  <span className="text-xs text-gray-500">
                    10/10/2025 at 5:30 AM
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#f6f6f6] p-3 rounded-2xl">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-lg">
                  <BookOpen size={24} className="text-white " />
                </div>
                <div>
                  <h3 className="text-[20px] font-medium">
                    New Student Enrolled
                  </h3>
                  <p className="text-[18px] text-gray-500">
                    Ethan Johnson joined 3rd Grade Reading ·
                  </p>
                  <span className="text-xs text-gray-500">
                    10/10/2025 at 5:30 AM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Class Overview */}
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Class Overview</h3>
              <button className="text-blue-500 text-sm hover:underline">
                View All Classes
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-100 rounded-xl p-3">
                <div className="flex gap-2 items-center">
                  <div className="bg-gradient-to-br from-amber-500 to-red-500 w-10 h-10 flex items-center justify-center rounded-lg">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">3rd Grade Mathematics</h4>
                    <p>2 Students</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-1">
                  Advanced math for 3rd grade students focusing on
                  multiplication...
                </p>
              </div>
              <div className="bg-amber-100 rounded-xl p-3">
                <div className="flex gap-2 items-center">
                  <div className="bg-gradient-to-br from-amber-500 to-red-500 w-10 h-10 flex items-center justify-center rounded-lg">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">3rd Grade Mathematics</h4>
                    <p>2 Students</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-1">
                  Advanced math for 3rd grade students focusing on
                  multiplication...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Right Column (Sidebar) ===== */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          {/* Calendar */}
          <div className="bg-white rounded-2xl shadow p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              // className="bg-white rounded-2xl shadow"
            />
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-white rounded-2xl shadow p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Upcoming Reminders</h3>
              <button className="text-blue-500 text-sm hover:underline">
                + Add
              </button>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="border-l-4 border-red-500 pl-3">
                <p className="font-medium">Grade Math Tests</p>
                <p className="text-xs text-gray-500">Due: 3/14/2024 · High</p>
              </li>
              <li className="border-l-4 border-orange-400 pl-3">
                <p className="font-medium">Parent-Teacher Conferences</p>
                <p className="text-xs text-gray-500">Due: 3/17/2024 · Medium</p>
              </li>
            </ul>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-2xl shadow p-3">
            <h3 className="text-lg font-semibold mb-3">Performance Summary</h3>
            <div className="text-sm space-y-2">
              <p>
                Average Grade: <span className="font-medium">B+</span>
              </p>
              <p>
                Attendance Rate: <span className="font-medium">94%</span>
              </p>
              <p>
                Assignments Completed: <span className="font-medium">87%</span>
              </p>
              <div className="mt-3 flex flex-col items-center">
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-gray-500">Overall</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;
