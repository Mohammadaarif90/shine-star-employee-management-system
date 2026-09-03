import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EmployeeProfile.css";

function EmployeeProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employees/${id}`,
        );

        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <div className="loading-spinner"></div>
          <p>Loading employee profile...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="profile-page">
        <div className="not-found-card">
          <div className="not-found-icon">👤</div>

          <h1>Employee Not Found</h1>

          <p>The employee profile you're looking for could not be found.</p>

          <button className="back-btn" onClick={() => navigate("/employees")}>
            ← Back to Employees
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${employee.firstName} ${employee.lastName}`;

  const initials = `${employee.firstName?.charAt(0) || ""}${
    employee.lastName?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Back Button */}
        <button
          className="profile-back-btn"
          onClick={() => navigate("/employees")}
        >
          ← Back to Employees
        </button>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-heading">
            <span>Employee Management</span>

            <h1>Employee Profile</h1>

            <p>View detailed information about this employee.</p>
          </div>

          <div className="profile-header-id">
            <div className="mini-avatar">{initials}</div>

            <div>
              <strong>{fullName}</strong>
              <span>
                Employee ID: EMP{String(employee.id).padStart(3, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="profile-card">
          {/* Employee Hero */}
          <div className="employee-hero">
            <div className="employee-avatar">{initials}</div>

            <div className="employee-hero-info">
              <h2>{fullName}</h2>

              <p>{employee.position}</p>

              <div className="hero-meta">
                <span>🏢 {employee.department}</span>

                <span className="active-badge">
                  <span className="status-dot"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="profile-sections">
            {/* Personal Information */}
            <section className="info-section">
              <div className="section-heading">
                <div className="section-icon">👤</div>

                <div>
                  <h3>Personal Information</h3>
                  <p>Employee contact and basic information.</p>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">First Name</span>
                  <span className="info-value">{employee.firstName}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Last Name</span>
                  <span className="info-value">{employee.lastName}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{employee.email}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Phone Number</span>
                  <span className="info-value">{employee.phone}</span>
                </div>
              </div>
            </section>

            {/* Job Information */}
            <section className="info-section">
              <div className="section-heading">
                <div className="section-icon">💼</div>

                <div>
                  <h3>Job Information</h3>
                  <p>Employee's professional and employment details.</p>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Employee ID</span>
                  <span className="info-value">
                    EMP{String(employee.id).padStart(3, "0")}
                  </span>
                </div>

                <div className="info-item">
                  <span className="info-label">Department</span>
                  <span className="info-value">{employee.department}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Position</span>
                  <span className="info-value">{employee.position}</span>
                </div>

                <div className="info-item salary-item">
                  <span className="info-label">Salary</span>
                  <span className="salary-value">
                    ₹{Number(employee.salary).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="info-item">
                  <span className="info-label">Joining Date</span>
                  <span className="info-value">{employee.joiningDate}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">Employment Status</span>

                  <span className="active-badge">
                    <span className="status-dot"></span>
                    Active
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="profile-actions">
            <button
              className="action-secondary"
              onClick={() => navigate("/employees")}
            >
              ← Back
            </button>

            <button
              className="action-primary"
              onClick={() => navigate(`/employees/${id}/edit`)}
            >
              ✏️ Edit Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;
