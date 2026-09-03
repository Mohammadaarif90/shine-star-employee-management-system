import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import EditEmployee from "./pages/EditEmployee";
import Settings from "./pages/Settings";
import EmployeeProfile from "./pages/EmployeeProfile";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            Default Page
        ========================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* =========================
            Login - Public Route
        ========================= */}
        <Route path="/login" element={<Login />} />

        {/* =========================
            Protected Routes
        ========================= */}
        <Route element={<ProtectedRoute />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Employee List */}
          <Route path="/employees" element={<EmployeeList />} />

          {/* Add Employee */}
          <Route path="/employees/add" element={<AddEmployee />} />

          {/* Employee Profile */}
          <Route path="/employees/:id" element={<EmployeeProfile />} />

          {/* Edit Employee */}
          <Route path="/employees/:id/edit" element={<EditEmployee />} />

          {/* Attendance */}
          <Route path="/attendance" element={<Attendance />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
