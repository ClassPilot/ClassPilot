import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./Components/Layout/SideBar";
import HeaderBar from "./Components/Layout/HeaderBar";

import DashBoardPage from "./Pages/DashBoardPage";
import StudentPage from "./Pages/StudentPage";
import ClassesPage from "./Pages/ClassesPage";
import LoginPage from "./Pages/LoginPage";
import SingupPage from "./Pages/SingupPage";
import ProfilePage from "./Pages/ProfilePage";
import MessagesPage from "./Pages/MessagesPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main content */}
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          <HeaderBar />
          <main className="flex-1 overflow-y-auto bg-[#f6f6f6] p-4">
            <Routes>
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/students" element={<StudentPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/singup" element={<SingupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
