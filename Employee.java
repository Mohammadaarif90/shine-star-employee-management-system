public class Employee {

  // Employee information
  private String employeeId;
  private String name;
  private String email;
  private String phone;
  private String department;
  private String designation;
  private String branch;
  private double salary;
  private String joiningDate;
  private String status;

  // Constructor
  public Employee(String employeeId, String name, String email, String phone,
      String department, String designation, String branch,
      double salary, String joiningDate, String status) {

    this.employeeId = employeeId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.department = department;
    this.designation = designation;
    this.branch = branch;
    this.salary = salary;
    this.joiningDate = joiningDate;
    this.status = status;
  }

  // Getter for employeeId
  public String getEmployeeId() {
    return employeeId;
  }

  // Setter for employeeId
  public void setEmployeeId(String employeeId) {
    this.employeeId = employeeId;
  }

  // Getter for name
  public String getName() {
    return name;
  }

  // Setter for name
  public void setName(String name) {
    this.name = name;
  }

  // Getter for email
  public String getEmail() {
    return email;
  }

  // Setter for email
  public void setEmail(String email) {
    this.email = email;
  }

  // Getter for phone
  public String getPhone() {
    return phone;
  }

  // Setter for phone
  public void setPhone(String phone) {
    this.phone = phone;
  }

  // Getter for department
  public String getDepartment() {
    return department;
  }

  // Setter for department
  public void setDepartment(String department) {
    this.department = department;
  }

  // Getter for designation
  public String getDesignation() {
    return designation;
  }

  // Setter for designation
  public void setDesignation(String designation) {
    this.designation = designation;
  }

  // Getter for branch
  public String getBranch() {
    return branch;
  }

  // Setter for branch
  public void setBranch(String branch) {
    this.branch = branch;
  }

  // Getter for salary
  public double getSalary() {
    return salary;
  }

  // Setter for salary
  public void setSalary(double salary) {
    this.salary = salary;
  }

  // Getter for joiningDate
  public String getJoiningDate() {
    return joiningDate;
  }

  // Setter for joiningDate
  public void setJoiningDate(String joiningDate) {
    this.joiningDate = joiningDate;
  }

  // Getter for status
  public String getStatus() {
    return status;
  }

  // Setter for status
  public void setStatus(String status) {
    this.status = status;
  }

  // Display employee information
  public void displayEmployee() {
    System.out.println("================================");
    System.out.println("       EMPLOYEE DETAILS");
    System.out.println("================================");
    System.out.println("Employee ID : " + employeeId);
    System.out.println("Name        : " + name);
    System.out.println("Email       : " + email);
    System.out.println("Phone       : " + phone);
    System.out.println("Department  : " + department);
    System.out.println("Designation : " + designation);
    System.out.println("Branch      : " + branch);
    System.out.println("Salary      : " + salary);
    System.out.println("Joining Date: " + joiningDate);
    System.out.println("Status      : " + status);
    System.out.println("================================");
  }
}