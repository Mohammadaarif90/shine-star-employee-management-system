import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddEmployee.css";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    salary: "",
    joiningDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all fields
    if (
      !employee.firstName ||
      !employee.lastName ||
      !employee.email ||
      !employee.phone ||
      !employee.department ||
      !employee.position ||
      !employee.salary ||
      !employee.joiningDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("/api/employees", employee);

      console.log("Employee added:", response.data);

      alert("Employee added successfully!");

      // Employee List page par jao
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      alert("Failed to add employee. Please check backend.");
    }
  };

  return (
    <div className="add-employee-page">
      <div className="form-header">
        <div>
          <h1>Add New Employee</h1>
          <p>Add a new employee to Shine Star</p>
        </div>
      </div>

      <form className="employee-form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={employee.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={employee.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={employee.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={employee.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter department"
              value={employee.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              placeholder="Enter position"
              value={employee.position}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="Enter salary"
              value={employee.salary}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={employee.joiningDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>

          <button type="submit" className="save-btn">
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
