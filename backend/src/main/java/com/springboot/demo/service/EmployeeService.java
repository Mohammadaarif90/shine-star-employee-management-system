package com.springboot.demo.service;

import com.springboot.demo.entity.Employee;
import com.springboot.demo.repository.AttendanceRepository;
import com.springboot.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            AttendanceRepository attendanceRepository) {

        this.employeeRepository = employeeRepository;
        this.attendanceRepository = attendanceRepository;
    }

    // Add Employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee By ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Update Employee
    public Optional<Employee> updateEmployee(Long id, Employee employee) {

        return employeeRepository.findById(id).map(existingEmployee -> {

            existingEmployee.setFirstName(employee.getFirstName());
            existingEmployee.setLastName(employee.getLastName());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setPhone(employee.getPhone());
            existingEmployee.setDepartment(employee.getDepartment());
            existingEmployee.setPosition(employee.getPosition());
            existingEmployee.setSalary(employee.getSalary());
            existingEmployee.setJoiningDate(employee.getJoiningDate());

            return employeeRepository.save(existingEmployee);
        });
    }

    // Delete Employee
    @Transactional
    public boolean deleteEmployee(Long id) {

        if (!employeeRepository.existsById(id)) {
            return false;
        }

        // Delete attendance records first
        attendanceRepository.deleteByEmployeeId(id);

        // Then delete employee
        employeeRepository.deleteById(id);

        return true;
    }
}