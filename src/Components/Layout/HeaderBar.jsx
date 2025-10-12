import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  MessageSquare,
  Hand,
  User as UserIcon,
  Trash2,
  Check,
  Search as SearchIcon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/Store/slices/AuthSlice";

export default function HeaderBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Get user directly from auth slice
  const user = useSelector((state) => state.auth.user);

  // students for notifications
  const students = useSelector(
    (state) => state.students?.items || state.students || []
  );

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [readIds, setReadIds] = useState(() => {
    try {
      return new Set(
        JSON.parse(localStorage.getItem("readNotifications") || "[]")
      );
    } catch {
      return new Set();
    }
  });

  const displayName =
    (user?.firstName || user?.lastName
      ? [user.firstName, user.lastName].filter(Boolean).join(" ")
      : user?.name) || "Teacher";

  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // load reminders from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("reminders") || "[]");
      setReminders(Array.isArray(saved) ? saved : []);
    } catch {
      setReminders([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "readNotifications",
      JSON.stringify(Array.from(readIds))
    );
  }, [readIds]);

  // build notifications
  const notifications = useMemo(() => {
    const list = [];

    if (students.length) {
      students.slice(-3).forEach((s) => {
        list.push({
          id: `student-${s._id ?? s.id ?? s.name}`,
          type: "student",
          title: `${s.name || s.username || "New student"} joined`,
          desc: `Grade ${s.grade ?? "N/A"}`,
          time: s.createdAt,
        });
      });
    }

    reminders.forEach((r) =>
      list.push({
        id: `reminder-${r.id}`,
        type: "reminder",
        title: r.title,
        desc: r.desc,
        time: r.createdAt,
      })
    );

    return list.sort(
      (a, b) =>
        (b.time ? new Date(b.time).getTime() : 0) -
        (a.time ? new Date(a.time).getTime() : 0)
    );
  }, [students, reminders]);

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  const toggleOpen = () => setOpen((v) => !v);
  const markRead = (id) => setReadIds((s) => new Set([...s, id]));
  const markAllRead = () => setReadIds(new Set(notifications.map((n) => n.id)));
  const clearAll = () => {
    localStorage.removeItem("reminders");
    setReminders([]);
    setReadIds(new Set());
  };
  const deleteReminder = (id) => {
    const key = String(id).replace("reminder-", "");
    const next = reminders.filter((r) => String(r.id) !== key);
    setReminders(next);
    localStorage.setItem("reminders", JSON.stringify(next));
    setReadIds((s) => new Set([...s, id]));
  };

  // auto-mark visible notifications as read
  useEffect(() => {
    if (!open) return;
    const toMark = notifications.slice(0, 10).map((n) => n.id);
    const t = setTimeout(
      () => setReadIds((s) => new Set([...s, ...toMark])),
      600
    );
    return () => clearTimeout(t);
  }, [open, notifications]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  // search debounce
  useEffect(() => {
    const t = setTimeout(() => {
      if (query.trim())
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }, 400);
    return () => clearTimeout(t);
  }, [query, navigate]);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-3 bg-white shadow-sm gap-4 md:gap-0">
      {/* Greeting */}
      <div className="flex flex-col md:flex-1">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#1F1C2C] to-[#6E45E2] bg-clip-text text-transparent flex items-center gap-2">
          Hello {displayName} <Hand className="w-6 h-6 text-[#6E45E2]" />
        </h2>
        <span className="text-sm text-gray-500">
          Ready to inspire minds today?
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md w-full">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search subjects, assignments..."
            className="w-full rounded-2xl bg-[#f6f6f6] border border-[#e1e1e1] px-12 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleOpen}
            className="relative p-2 rounded-lg hover:bg-gray-100"
          >
            <Bell size={20} className="text-gray-600 cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 text-xs text-white px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50">
              <div className="flex items-center justify-between p-3 border-b">
                <div className="text-sm font-semibold">Notifications</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={markAllRead}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <Check size={12} /> Mark all
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="max-h-64 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => {
                    const isRead = readIds.has(n.id);
                    return (
                      <div
                        key={n.id}
                        className={`flex items-start justify-between gap-3 p-3 border-b ${
                          !isRead ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium">{n.title}</div>
                            {!isRead && (
                              <span className="text-xs bg-rose-500 text-white px-2 rounded-full">
                                new
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{n.desc}</div>
                          <div className="text-[11px] text-gray-400 mt-1">
                            {n.time ? new Date(n.time).toLocaleString() : ""}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {n.type === "reminder" && (
                            <button
                              onClick={() => deleteReminder(n.id)}
                              className="text-rose-500 hover:text-rose-700 p-1"
                              title="Delete reminder"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => markRead(n.id)}
                            className="text-gray-500 hover:text-gray-700 text-xs"
                          >
                            Mark
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <MessageSquare size={20} className="text-gray-600 cursor-pointer" />

        {/* Profile & Logout */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700 hidden md:block">
            {displayName}
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
            <UserIcon size={16} />
          </div>
          <button
            onClick={handleLogout}
            className="text-xs bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
