import { useEffect, useState } from "react";
import axios from "axios";
import "./Attendance.css";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [status, setStatus] = useState("PRESENT");

  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // Set Today's Date
  // =========================
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setAttendanceDate(today);
  }, []);

  // =========================
  // Load Employees
  // =========================
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");

        console.log("Employees fetched:", response.data);

        setEmployees(response.data);
      } catch (error) {
        console.error("Employee fetch error:", error);
        setMessage("Failed to load employees ❌");
      }
    };

    fetchEmployees();
  }, []);

  // =========================
  // Get Current Month Dates
  // =========================
  const getCurrentMonthDates = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");

    const startDate = `${year}-${month}-01`;

    const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();

    const endDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}`;

    return { startDate, endDate };
  };

  // =========================
  // Get Attendance Summary
  // =========================
  const getSummary = async (employeeId) => {
    if (!employeeId) {
      setSummary(null);
      return;
    }

    try {
      const { startDate, endDate } = getCurrentMonthDates();

      const response = await axios.get(
        `/api/attendance/employee/${employeeId}/summary`,
        {
          params: {
            startDate,
            endDate,
          },
        },
      );

      console.log("Attendance Summary:", response.data);

      setSummary(response.data);
    } catch (error) {
      console.error("Summary error:", error);
      setSummary(null);
    }
  };

  // =========================
  // Employee Change
  // =========================
  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;

    setSelectedEmployee(employeeId);
    setMessage("");

    getSummary(employeeId);
  };

  // =========================
  // Mark Attendance
  // =========================
  const markAttendance = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!selectedEmployee) {
      setMessage("Please select an employee ❌");
      return;
    }

    if (!attendanceDate) {
      setMessage("Please select attendance date ❌");
      return;
    }

    if (!status) {
      setMessage("Please select status ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/attendance", null, {
        params: {
          employeeId: selectedEmployee,
          attendanceDate: attendanceDate,
          status: status,
        },
      });

      setMessage("Attendance marked successfully ✅");

      // Refresh summary
      await getSummary(selectedEmployee);
    } catch (error) {
      console.error("Attendance error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      setMessage("Failed to mark attendance ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-page">
      {/* =========================
          Header
      ========================= */}
      <div className="attendance-header">
        <div>
          <h1>Attendance Management</h1>
          <p>Mark and manage employee attendance</p>
        </div>
      </div>

      {/* =========================
          Mark Attendance Card
      ========================= */}
      <div className="attendance-card">
        <h2>Mark Attendance</h2>

        <p className="attendance-card-subtitle">
          Select an employee and mark their daily attendance.
        </p>

        <form onSubmit={markAttendance}>
          {/* Employee */}
          <div className="attendance-form-group">
            <label>Employee</label>

            <select value={selectedEmployee} onChange={handleEmployeeChange}>
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="attendance-form-group">
            <label>Attendance Date</label>

            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="attendance-form-group">
            <label>Status</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
              <option value="LEAVE">Leave</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mark-attendance-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Mark Attendance"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`attendance-message ${
              message.includes("successfully")
                ? "success-message"
                : "error-message"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      {/* =========================
          Attendance Summary
      ========================= */}
      {summary && (
        <div className="attendance-summary">
          <div className="summary-header">
            <div>
              <h2>Attendance Summary</h2>
              <p>Current month attendance</p>
            </div>
          </div>

          {/* Summary Employee */}
          <div className="summary-employee">
            <span className="summary-avatar">
              {summary.employeeName
                ? summary.employeeName
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "EM"}
            </span>

            <div>
              <h3>{summary.employeeName}</h3>
              <p>Attendance Overview</p>
            </div>
          </div>

          {/* Summary Boxes */}
          <div className="summary-grid">
            <div className="summary-box working-days">
              <span className="summary-icon">📅</span>
              <div>
                <h3>Working Days</h3>
                <p>{summary.totalWorkingDays ?? 0}</p>
              </div>
            </div>

            <div className="summary-box present-days">
              <span className="summary-icon">✓</span>
              <div>
                <h3>Present</h3>
                <p>{summary.presentDays ?? 0}</p>
              </div>
            </div>

            <div className="summary-box absent-days">
              <span className="summary-icon">✕</span>
              <div>
                <h3>Absent</h3>
                <p>{summary.absentDays ?? 0}</p>
              </div>
            </div>

            <div className="summary-box attendance-percentage">
              <span className="summary-icon">%</span>
              <div>
                <h3>Attendance</h3>
                <p>{summary.attendancePercentage ?? 0}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          No Employee Selected
      ========================= */}
      {!summary && selectedEmployee && (
        <div className="no-summary">
          <p>No attendance summary available.</p>
        </div>
      )}
    </div>
  );
}

export default Attendance;
