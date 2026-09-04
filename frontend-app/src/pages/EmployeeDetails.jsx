import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EmployeeDetails.css";

function EmployeeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend se employee details fetch
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

  // Loading
  if (loading) {
    return <h2>Loading employee...</h2>;
  }

  // Employee not found
  if (!employee) {
    return (
      <div>
        <h1>Employee Not Found</h1>

        <button onClick={() => navigate("/employees")}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="employee-details-page">
      <button onClick={() => navigate("/employees")}>
        ← Back to Employees
      </button>

      <h1>Employee Profile</h1>

      <h2>
        👤 {employee.firstName} {employee.lastName}
      </h2>

      <p>{employee.position}</p>

      <hr />

      <p>
        <strong>Employee ID:</strong> EMP00{employee.id}
      </p>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <p>
        <strong>Phone:</strong> {employee.phone || "-"}
      </p>

      <p>
        <strong>Department:</strong> {employee.department || "-"}
      </p>

      <p>
        <strong>Position:</strong> {employee.position || "-"}
      </p>

      <p>
        <strong>Salary:</strong> ₹{employee.salary || "-"}
      </p>

      <p>
        <strong>Joining Date:</strong> {employee.joiningDate || "-"}
      </p>

      <p>
        <strong>Status:</strong> 🟢 Active
      </p>

      <br />

      <button onClick={() => navigate(`/employees/${employee.id}/edit`)}>
        Edit Employee
      </button>
    </div>
  );
}

export default EmployeeDetails;
