import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Employees
  // =========================
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/employees`);

      setEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================
  // Logout
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // =========================
  // Employee Statistics
  // =========================
  const totalEmployees = employees.length;

  // Backend me abhi status field nahi hai,
  // isliye currently all employees active.
  const activeEmployees = employees.length;

  const inactiveEmployees = 0;

  // =========================
  // Departments
  // =========================
  const departments = useMemo(() => {
    const departmentMap = {};

    employees.forEach((employee) => {
      const department = employee.department?.trim() || "Other";

      departmentMap[department] = (departmentMap[department] || 0) + 1;
    });

    return Object.entries(departmentMap)
      .map(([name, count]) => ({
        name,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [employees]);

  const totalDepartments = departments.length;

  const maxDepartmentCount =
    departments.length > 0
      ? Math.max(...departments.map((item) => item.count))
      : 1;

  // =========================
  // Recent Employees
  // =========================
  const recentEmployees = [...employees].reverse().slice(0, 5);

  // =========================
  // Initials
  // =========================
  const getInitials = (employee) => {
    const firstName = employee.firstName || "";
    const lastName = employee.lastName || "";

    const initials = firstName.charAt(0) + lastName.charAt(0);

    return initials.toUpperCase() || "EM";
  };

  // =========================
  // Current Date
  // =========================
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="dashboard">
      {/* =================================================
          SIDEBAR
      ================================================= */}
      <aside className="dashboard-sidebar">
        {/* Logo */}
        <div className="sidebar-logo-area">
          <div className="sidebar-logo">
            <span>✦</span>
          </div>

          <div>
            <h2>Shine Star</h2>
            <p>Employee Management</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <button
            className="sidebar-nav-item active"
            onClick={() => navigate("/dashboard")}
          >
            <span className="nav-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => navigate("/employees")}
          >
            <span className="nav-icon">♙</span>
            <span>Employees</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => navigate("/employees/add")}
          >
            <span className="nav-icon">＋</span>
            <span>Add Employee</span>
          </button>

          <button
            className="sidebar-nav-item"
            onClick={() => navigate("/attendance")}
          >
            <span className="nav-icon">▣</span>
            <span>Attendance</span>
          </button>
        </nav>

        {/* Bottom User */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">MA</div>

          <div className="sidebar-user-info">
            <strong>Mohammad Aarif</strong>
            <span>Admin</span>

            <small>
              <i></i>
              Online
            </small>
          </div>
        </div>
      </aside>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}
      <main className="dashboard-main">
        {/* =================================================
            TOP HEADER
        ================================================= */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-btn"
              onClick={() => {
                document
                  .querySelector(".dashboard-sidebar")
                  ?.classList.toggle("sidebar-open");
              }}
            >
              ☰
            </button>

            <div>
              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="topbar-right">
            {/* Notification */}
            <button className="notification-btn">
              ♧<span>3</span>
            </button>

            {/* Date */}
            <div className="dashboard-date">
              <div className="date-icon">▣</div>

              <div>
                <strong>{formattedDate}</strong>
                <span>{formattedTime}</span>
              </div>
            </div>

            {/* User */}
            <div className="topbar-user">
              <div className="topbar-avatar">MA</div>

              <div>
                <strong>Mohammad Aarif</strong>
                <span>Admin</span>
              </div>

              <span className="user-arrow">▾</span>
            </div>

            {/* Logout */}
            <button className="topbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* =================================================
            WELCOME
        ================================================= */}
        <section className="welcome-section">
          <div>
            <h2>Welcome back, Mohammad Aarif! 👋</h2>

            <p>Here's what's happening with your organization today.</p>
          </div>
        </section>

        {/* =================================================
            STATISTICS
        ================================================= */}
        <section className="stats-grid">
          {/* Total Employees */}
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon blue">♙</div>

            <div className="dashboard-stat-content">
              <span>Total Employees</span>

              <strong>{loading ? "..." : totalEmployees}</strong>

              <small>All registered employees</small>
            </div>
          </div>

          {/* Active */}
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon green">✓</div>

            <div className="dashboard-stat-content">
              <span>Active Employees</span>

              <strong>{loading ? "..." : activeEmployees}</strong>

              <small>Currently active</small>
            </div>
          </div>

          {/* Departments */}
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon purple">▥</div>

            <div className="dashboard-stat-content">
              <span>Departments</span>

              <strong>{loading ? "..." : totalDepartments}</strong>

              <small>Available departments</small>
            </div>
          </div>

          {/* Inactive */}
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon orange">!</div>

            <div className="dashboard-stat-content">
              <span>Inactive Employees</span>

              <strong>{loading ? "..." : inactiveEmployees}</strong>

              <small>Currently inactive</small>
            </div>
          </div>
        </section>

        {/* =================================================
            MIDDLE SECTION
        ================================================= */}
        <section className="dashboard-middle">
          {/* =================================================
              RECENT EMPLOYEES
          ================================================= */}
          <div className="recent-employees-card">
            <div className="card-header">
              <div>
                <h2>Recent Employees</h2>
                <p>Recently added employees</p>
              </div>

              <button onClick={() => navigate("/employees")}>View All →</button>
            </div>

            <div className="employee-table">
              {/* Table Header */}
              <div className="employee-table-head">
                <span>EMPLOYEE</span>
                <span>EMAIL</span>
                <span>POSITION</span>
                <span>STATUS</span>
                <span>ACTION</span>
              </div>

              {/* Rows */}
              {loading ? (
                <div className="dashboard-empty">Loading employees...</div>
              ) : recentEmployees.length > 0 ? (
                recentEmployees.map((employee) => (
                  <div className="employee-table-row" key={employee.id}>
                    {/* Employee */}
                    <div className="table-employee">
                      <div className="table-avatar">
                        {getInitials(employee)}
                      </div>

                      <div>
                        <strong>
                          {employee.firstName} {employee.lastName}
                        </strong>

                        <span>EMP{String(employee.id).padStart(3, "0")}</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="table-email">{employee.email || "-"}</div>

                    {/* Position */}
                    <div className="table-position">
                      {employee.position || "-"}
                    </div>

                    {/* Status */}
                    <div>
                      <span className="status-badge active-status">
                        <i></i>
                        Active
                      </span>
                    </div>

                    {/* Action */}
                    <button
                      className="view-employee-btn"
                      onClick={() => navigate(`/employees/${employee.id}`)}
                    >
                      ◉
                    </button>
                  </div>
                ))
              ) : (
                <div className="dashboard-empty">No employees found.</div>
              )}
            </div>

            {/* Bottom View All */}
            {recentEmployees.length > 0 && (
              <div className="table-footer">
                <button onClick={() => navigate("/employees")}>
                  View All Employees
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}
          <div className="quick-actions-card">
            <div className="card-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Manage employees quickly</p>
              </div>
            </div>

            <div className="quick-actions-list">
              <button
                className="quick-action"
                onClick={() => navigate("/employees/add")}
              >
                <div className="quick-action-icon blue">♙</div>

                <div>
                  <strong>Add New Employee</strong>
                  <span>Register a new employee</span>
                </div>

                <b>›</b>
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/employees")}
              >
                <div className="quick-action-icon green">♙</div>

                <div>
                  <strong>View All Employees</strong>
                  <span>Manage employee information</span>
                </div>

                <b>›</b>
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/attendance")}
              >
                <div className="quick-action-icon orange">▣</div>

                <div>
                  <strong>Mark Attendance</strong>
                  <span>Record employee attendance</span>
                </div>

                <b>›</b>
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            BOTTOM SECTION
        ================================================= */}
        <section className="dashboard-bottom">
          {/* =================================================
              ATTENDANCE OVERVIEW
          ================================================= */}
          <div className="attendance-overview-card">
            <div className="card-header">
              <div>
                <h2>Attendance Overview</h2>
                <p>Employee attendance summary</p>
              </div>

              <span className="month-label">This Month ▾</span>
            </div>

            <div className="attendance-overview-content">
              {/* Donut */}
              <div className="attendance-donut">
                <div className="donut-inner">
                  <strong>—</strong>
                  <span>Attendance</span>
                </div>
              </div>

              {/* Legend */}
              <div className="attendance-legend">
                <div>
                  <i className="legend-present"></i>
                  <span>Present</span>
                  <strong>—</strong>
                </div>

                <div>
                  <i className="legend-absent"></i>
                  <span>Absent</span>
                  <strong>—</strong>
                </div>

                <p>Mark attendance to see overview</p>
              </div>
            </div>
          </div>

          {/* =================================================
              DEPARTMENT OVERVIEW
          ================================================= */}
          <div className="department-card">
            <div className="card-header">
              <div>
                <h2>Employees by Department</h2>
                <p>Employee distribution</p>
              </div>

              <span className="month-label">Current</span>
            </div>

            <div className="department-chart">
              {departments.length > 0 ? (
                departments.slice(0, 5).map((department, index) => {
                  const percentage =
                    (department.count / maxDepartmentCount) * 100;

                  return (
                    <div className="department-item" key={department.name}>
                      <div className="department-label">
                        <span>{department.name}</span>

                        <strong>{department.count}</strong>
                      </div>

                      <div className="department-bar">
                        <div
                          className={`department-fill department-color-${index}`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="dashboard-empty">
                  No department data available.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}
        <footer className="dashboard-footer">
          <span>© 2026 Shine Star</span>

          <span>Employee Management System</span>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
