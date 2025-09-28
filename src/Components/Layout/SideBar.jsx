import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Users,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

function SideBar({ isCollapsed, setIsCollapsed }) {
  return (
    <aside
      className={`bg-fuchsia-700 text-white h-screen flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[300px]"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo / Title */}
        <div className="flex items-center gap-2 p-4">
          <div className="bg-white text-fuchsia-700 w-8 h-8 flex items-center justify-center rounded-full">
            C
          </div>
          {!isCollapsed && (
            <h1 className="text-xl font-semibold">ClassPilot</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
          >
            <Home size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          <Link
            to="/students"
            className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
          >
            <Users size={20} />
            {!isCollapsed && <span>Students</span>}
          </Link>

          <Link
            to="/classes"
            className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
          >
            <BookOpen size={20} />
            {!isCollapsed && <span>Classes</span>}
          </Link>

          <Link
            to="/messages"
            className=" border-t border-fuchsia-600 mt-4 flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
          >
            <MessageSquare size={20} />
            {!isCollapsed && <span>Messages</span>}
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
          >
            <Settings size={20} />
            {!isCollapsed && <span>Profile</span>}
          </Link>
        </nav>
      </div>

      {/* Collapse / Expand Button */}
      <div className="p-4 border-t border-fuchsia-600 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-fuchsia-800 rounded-full transition"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
