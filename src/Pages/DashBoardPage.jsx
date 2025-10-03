import { Users, BookOpen, Clock, TrendingUp } from "lucide-react";

function DashBoardPage() {
  return (
    <div className="m-4">
      <div className="flex flex-wrap gap-3 justify-center items-center">
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
    </div>
  );
}

export default DashBoardPage;
