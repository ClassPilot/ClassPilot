// App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./Components/Layout/SideBar";
import HeaderBar from "./Components/Layout/HeaderBar";

import DashBoardPage from "./Pages/DashBoardPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ClassesPage from "./Pages/ClassesPage";
import StudentPage from "./Pages/StudentPage";
import LoginPage from "./Pages/LoginPage";
import MessagesPage from "./Pages/MessagesPage";
import ProfilePage from "./Pages/ProfilePage";

// ---- Layout gaar ah oo loo isticmaalo pages-ka app-ka ----
function AppLayout({ isCollapsed, setIsCollapsed }) {
  return (
    <div
      className={`grid min-h-screen transition-all duration-300 ${
        isCollapsed ? "grid-cols-[80px_1fr]" : "grid-cols-[300px_1fr]"
      }`}
    >
      <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="transition-all duration-300">
        <HeaderBar />
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <Routes>
        {/* ---- Auth pages: ma laha Sidebar/Header ---- */}
        <Route path="/login" element={<LoginPage />} />

        {/* ---- App pages: leh Sidebar/Header ---- */}
        <Route
          path="/*"
          element={
            <AppLayout
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          }
        />
      </Routes>
    </Router>
  );
}
