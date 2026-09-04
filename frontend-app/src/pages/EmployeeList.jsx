import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeList.css";

function EmployeeList() {
  const navigate = useNavigate();

  // =========================
  // States
  // =========================
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // =========================
  // Fetch Employees
  // =========================
  const fetchEmployees = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await axios.get("/api/employees");

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);

      alert("Failed to load employees. Please check backend.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================
  // Page Load
  // =========================
  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================
  // Search Employee
  // =========================
  const filteredEmployees = employees.filter((employee) => {
    const firstName = employee.firstName || "";
    const lastName = employee.lastName || "";
    const email = employee.email || "";
    const department = employee.department || "";
    const position = employee.position || "";

    const fullName = `${firstName} ${lastName}`.toLowerCase();

    const searchText = search.toLowerCase().trim();

    return (
      fullName.includes(searchText) ||
      email.toLowerCase().includes(searchText) ||
      department.toLowerCase().includes(searchText) ||
      position.toLowerCase().includes(searchText)
    );
  });

  // =========================
  // Delete Employee
  // =========================
  const handleDelete = async (id) => {
    const employee = employees.find((item) => item.id === id);

    const employeeName = employee
      ? `${employee.firstName || ""} ${employee.lastName || ""}`.trim()
      : "this employee";

    const confirmed = window.confirm(
      `Are you sure you want to delete ${employeeName}?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await axios.deleteaxios.delete(`/api/employees/${id}`);

      setEmployees((previousEmployees) =>
        previousEmployees.filter((employee) => employee.id !== id),
      );

      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);

      alert("Failed to delete employee. Please check backend.");
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // Get Initials
  // =========================
  const getInitials = (employee) => {
    const firstName = employee.firstName || "";
    const lastName = employee.lastName || "";

    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(0);

    const initials = `${firstInitial}${lastInitial}`.trim();

    if (!initials) {
      return "NA";
    }

    return initials.toUpperCase();
  };

  // =========================
  // Get Full Name
  // =========================
  const getFullName = (employee) => {
    return (
      `${employee.firstName || ""} ${employee.lastName || ""}`.trim() ||
      "Unnamed Employee"
    );
  };

  // =========================
  // Get Status
  // =========================
  const isEmployeeActive = (employee) => {
    return !employee.status || employee.status.toLowerCase() === "active";
  };

  // =========================
  // Loading Screen
  // =========================
  if (loading) {
    return (
      <div className="employee-list-page">
        <div className="loading-card">
          <div className="loading-spinner"></div>

          <h2>Loading Employees</h2>

          <p>Please wait while we fetch employee data...</p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="employee-list-page">
      {/* =========================
          Top Navigation
      ========================= */}
      <div className="top-navigation">
        <button
          type="button"
          className="back-dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* =========================
          Header
      ========================= */}
      <div className="employee-list-header">
        <div className="page-title-area">
          <div className="brand-logo">SS</div>

          <div>
            <h1>Employees</h1>

            <p>Manage all employees of Shine Star</p>
          </div>
        </div>

        <button
          type="button"
          className="add-employee-btn"
          onClick={() => navigate("/employees/add")}
        >
          <span className="plus-icon">+</span>
          Add Employee
        </button>
      </div>

      {/* =========================
          Search + Count
      ========================= */}
      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search by name, email, department or position..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="employee-count">
          <strong>{filteredEmployees.length}</strong>

          <span>
            {filteredEmployees.length === 1 ? "Employee" : "Employees"}
          </span>
        </div>
      </div>

      {/* =========================
          Employee List Card
      ========================= */}
      <div className="employee-list-card">
        {/* Card Header */}
        <div className="list-card-header">
          <div>
            <h2>Employee List</h2>

            <p>View and manage your organization's employees</p>
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={() => fetchEmployees(true)}
            disabled={refreshing}
          >
            <span
              className={refreshing ? "refresh-icon spinning" : "refresh-icon"}
            >
              ↻
            </span>

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* =========================
            Table Wrapper
        ========================= */}
        <div className="table-wrapper">
          <div className="employee-list-table">
            {/* Table Header */}
            <div className="employee-table-header">
              <span>ID</span>

              <span>Employee</span>

              <span>Email</span>

              <span>Department</span>

              <span>Position</span>

              <span>Status</span>

              <span>Actions</span>
            </div>

            {/* =========================
                Employee Rows
            ========================= */}
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => {
                const active = isEmployeeActive(employee);

                return (
                  <div className="employee-table-row" key={employee.id}>
                    {/* ID */}
                    <span className="employee-id">#{employee.id}</span>

                    {/* Employee */}
                    <span className="list-employee-name">
                      <span className="list-avatar">
                        {getInitials(employee)}
                      </span>

                      <span className="employee-name-info">
                        <strong>{getFullName(employee)}</strong>

                        <small>Employee ID #{employee.id}</small>
                      </span>
                    </span>

                    {/* Email */}
                    <span className="email-text">{employee.email || "-"}</span>

                    {/* Department */}
                    <span className="department-text">
                      {employee.department || "-"}
                    </span>

                    {/* Position */}
                    <span className="position-text">
                      {employee.position || "-"}
                    </span>

                    {/* Status */}
                    <span>
                      <span
                        className={`list-status ${
                          active ? "list-active" : "list-inactive"
                        }`}
                      >
                        <span className="status-dot"></span>

                        {active ? "Active" : "Inactive"}
                      </span>
                    </span>

                    {/* Actions */}
                    <span className="action-buttons">
                      {/* View */}
                      <button
                        type="button"
                        className="view-action"
                        onClick={() => navigate(`/employees/${employee.id}`)}
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        className="edit-action"
                        onClick={() =>
                          navigate(`/employees/${employee.id}/edit`)
                        }
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        className="delete-action"
                        disabled={deletingId === employee.id}
                        onClick={() => handleDelete(employee.id)}
                      >
                        {deletingId === employee.id ? "..." : "Delete"}
                      </button>
                    </span>
                  </div>
                );
              })
            ) : (
              /* Empty State */
              <div className="empty-state">
                <div className="empty-icon">{search ? "⌕" : "👥"}</div>

                <h3>{search ? "No employees found" : "No employees yet"}</h3>

                <p>
                  {search
                    ? `No employee matches "${search}". Try a different search.`
                    : "Start by adding your first employee."}
                </p>

                {search ? (
                  <button
                    type="button"
                    className="empty-clear-btn"
                    onClick={() => setSearch("")}
                  >
                    Clear Search
                  </button>
                ) : (
                  <button
                    type="button"
                    className="empty-add-btn"
                    onClick={() => navigate("/employees/add")}
                  >
                    + Add Employee
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
