import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditEmployee.css";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`);

        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/employees/${id}`, {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        salary: employee.salary,
        joiningDate: employee.joiningDate,
      });

      console.log("Employee updated:", response.data);

      alert("Employee updated successfully!");

      navigate(`/employees/${id}`);
    } catch (error) {
      console.error("Error updating employee:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      alert("Failed to update employee.");
    }
  };

  if (loading) {
    return (
      <div className="edit-page">
        <div className="loading-card">
          <div className="loader"></div>
          <h2>Loading employee...</h2>
          <p>Please wait while we fetch the details.</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="edit-page">
        <div className="not-found-card">
          <div className="not-found-icon">!</div>
          <h1>Employee Not Found</h1>
          <p>The employee you are looking for does not exist.</p>

          <button className="back-btn" onClick={() => navigate("/employees")}>
            ← Back to Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-container">
        {/* Header */}
        <div className="edit-header">
          <div>
            <button
              className="back-link"
              onClick={() => navigate(`/employees/${id}`)}
            >
              ← Back to Profile
            </button>

            <h1>Edit Employee</h1>
            <p>Update employee information for Shine Star</p>
          </div>

          <div className="employee-badge">
            <div className="employee-avatar">
              {employee.firstName?.charAt(0)}
              {employee.lastName?.charAt(0)}
            </div>

            <div>
              <strong>
                {employee.firstName} {employee.lastName}
              </strong>
              <span>Employee ID: EMP{String(id).padStart(3, "0")}</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <form className="edit-form-card" onSubmit={handleUpdate}>
          <div className="section-title">
            <h2>Personal Information</h2>
            <p>Update the employee's basic information.</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={employee.firstName || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employee.lastName || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={employee.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={employee.phone || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="section-title second-section">
            <h2>Job Information</h2>
            <p>Update department, position and salary details.</p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={employee.department || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={employee.position || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>
              <div className="input-with-symbol">
                <span>₹</span>
                <input
                  type="number"
                  name="salary"
                  value={employee.salary || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={employee.joiningDate || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(`/employees/${id}`)}
            >
              Cancel
            </button>

            <button type="submit" className="update-btn">
              ✓ Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
