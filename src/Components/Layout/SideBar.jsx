import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Users,
  BookOpen,
  MessageSquare,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

function SideBar({ isCollapsed, setIsCollapsed }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobile}
      ></div>

      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between h-screen
          bg-gradient-to-b from-indigo-800 via-indigo-900 to-violet-900
          text-white transition-all duration-300
          ${isCollapsed ? "w-[80px]" : "w-[200px]"}
          flex-shrink-0
          md:relative
          absolute md:static
          z-30
          ${isMobileOpen ? "left-0" : "-left-full"}
        `}
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
              onClick={() => setIsMobileOpen(false)}
            >
              <Home size={20} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
            <Link
              to="/students"
              className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
              onClick={() => setIsMobileOpen(false)}
            >
              <Users size={20} />
              {!isCollapsed && <span>Students</span>}
            </Link>
            <Link
              to="/classes"
              className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
              onClick={() => setIsMobileOpen(false)}
            >
              <BookOpen size={20} />
              {!isCollapsed && <span>Classes</span>}
            </Link>
            <hr className="border-white/20 my-2" />
            <Link
              to="/messages"
              className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
              onClick={() => setIsMobileOpen(false)}
            >
              <MessageSquare size={20} />
              {!isCollapsed && <span>Messages</span>}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-3 p-3 hover:bg-fuchsia-800 transition rounded"
              onClick={() => setIsMobileOpen(false)}
            >
              <Settings size={20} />
              {!isCollapsed && <span>Profile</span>}
            </Link>
          </nav>
        </div>

        {/* Collapse / Expand Button (desktop only) */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-fuchsia-800 rounded-full transition hidden md:block"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>
      </aside>

      {/* Mobile toggle button (always visible) */}
      <button
        className="fixed top-4 left-4 z-40 p-2 bg-indigo-700 text-white rounded-md md:hidden"
        onClick={toggleMobile}
      >
        {isMobileOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
}

export default SideBar;
