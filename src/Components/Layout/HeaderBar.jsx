import { Bell, MessageSquare, Hand } from "lucide-react";

function HeaderBar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <div className="flex flex-col">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#1F1C2C] to-[#6E45E2] bg-clip-text text-transparent flex items-center gap-2">
          Hello Sarah <Hand className="w-7 h-7 text-[#6E45E2] wave" />
        </h2>
        <span className="text-sm text-gray-500">
          Ready to inspire minds today?
        </span>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <form>
          <input
            type="text"
            placeholder="Search from subjects, assignments…"
            className="w-full rounded-2xl bg-[#f6f6f6] border border-[#e1e1e1] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell size={20} className="w-5 h-5 text-gray-600 cursor-pointer" />
          <span className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </div>
        <MessageSquare
          size={20}
          className="w-5 h-5 text-gray-600 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default HeaderBar;
