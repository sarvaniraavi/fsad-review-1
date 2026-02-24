import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/auth/LoginPage";
import { EducatorDashboard } from "./components/educator/EducatorDashboard";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { Toaster } from "./components/ui/sonner";
import { useState, useEffect } from "react";
import { User } from "./types";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !currentUser ? (
              <LoginPage onLogin={handleLogin} />
            ) : currentUser.role === "educator" ? (
              <Navigate to="/educator" />
            ) : (
              <Navigate to="/student" />
            )
          }
        />

        <Route
          path="/educator"
          element={
            currentUser?.role === "educator" ? (
              <EducatorDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/student"
          element={
            currentUser?.role === "student" ? (
              <StudentDashboard user={currentUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      <Toaster />
    </Router>
  );
}