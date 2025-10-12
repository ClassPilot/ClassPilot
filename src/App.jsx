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
import AddClassForm from "./Pages/AddClassForm";
import NotFoundPage from "./Pages/NotFoundPage";
import AddStudentForm from "./Pages/AddStudentForm";
import StudentDetailsPage from "./Pages/StudentDetailsPage";
import EditStudentForm from "./Pages/EditStudentForm";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import EditClassForm from "./Pages/EditClassForm";
import ClassDetailsPage from "./Pages/ClassDetailsPage";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function AppLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main content */}
        <div className="flex-1 flex flex-col transition-all duration-300">
          <HeaderBar />
          <main className="flex-1 overflow-y-auto bg-[#f6f6f6] p-4">
            {children}
          </main>
        </div>
      </div>

      {/* <YourRoutesOrLayoutComponents />
      <ToastContainer position="top-right" autoClose={3000} /> */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes (no sidebar/header) */}
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singup"
          element={
            <ProtectedRoute requireAuth={false}>
              <SingupPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes (with sidebar/header) */}
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={true}>
              <AppLayout>
                <DashBoardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute requireAuth={true}>
              <AppLayout>
                <StudentPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute requireAuth={true}>
              <AppLayout>
                <ClassesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/:id"
          element={
            <ProtectedRoute requireAuth={true}>
              <StudentDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/edit/:id"
          element={
            <ProtectedRoute requireAuth={true}>
              <EditStudentForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes/:id"
          element={
            <ProtectedRoute requireAuth={true}>
              <ClassDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes/edit/:id"
          element={
            <ProtectedRoute requireAuth={true}>
              <EditClassForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requireAuth={true}>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute requireAuth={true}>
              <AppLayout>
                <MessagesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-class"
          element={
            <ProtectedRoute requireAuth={true}>
              <AppLayout>
                <AddClassForm />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <ProtectedRoute requireAuth={true}>
              <AppLayout>
                <AddStudentForm />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
