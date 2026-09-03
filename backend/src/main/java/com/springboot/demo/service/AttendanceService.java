package com.springboot.demo.service;

import com.springboot.demo.entity.Attendance;
import com.springboot.demo.entity.Employee;
import com.springboot.demo.repository.AttendanceRepository;
import com.springboot.demo.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository,
            EmployeeRepository employeeRepository) {

        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    // Mark Attendance
    public Attendance markAttendance(
            Long employeeId,
            LocalDate attendanceDate,
            String status) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found with ID: " + employeeId));

        Attendance attendance = new Attendance();

        attendance.setEmployee(employee);
        attendance.setAttendanceDate(attendanceDate);
        attendance.setStatus(status);

        return attendanceRepository.save(attendance);
    }

    // Get Employee Attendance
    public List<Attendance> getEmployeeAttendance(Long employeeId) {

        return attendanceRepository.findByEmployeeId(employeeId);
    }

    // Get Monthly Attendance
    public List<Attendance> getMonthlyAttendance(
            Long employeeId,
            LocalDate startDate,
            LocalDate endDate) {

        return attendanceRepository
                .findByEmployeeIdAndAttendanceDateBetween(
                        employeeId,
                        startDate,
                        endDate
                );
    }

    // Attendance Summary
    public Map<String, Object> getAttendanceSummary(
            Long employeeId,
            LocalDate startDate,
            LocalDate endDate) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found with ID: " + employeeId));

        List<Attendance> attendanceList =
                attendanceRepository
                        .findByEmployeeIdAndAttendanceDateBetween(
                                employeeId,
                                startDate,
                                endDate
                        );

        long presentDays = attendanceList.stream()
                .filter(a -> "PRESENT".equalsIgnoreCase(a.getStatus()))
                .count();

        long absentDays = attendanceList.stream()
                .filter(a -> "ABSENT".equalsIgnoreCase(a.getStatus()))
                .count();

        long totalWorkingDays = presentDays + absentDays;

        double attendancePercentage = 0;

        if (totalWorkingDays > 0) {
            attendancePercentage =
                    (presentDays * 100.0) / totalWorkingDays;
        }

        Map<String, Object> summary = new HashMap<>();

        summary.put("employeeId", employee.getId());
        summary.put(
                "employeeName",
                employee.getFirstName() + " " + employee.getLastName()
        );
        summary.put("startDate", startDate);
        summary.put("endDate", endDate);
        summary.put("totalWorkingDays", totalWorkingDays);
        summary.put("presentDays", presentDays);
        summary.put("absentDays", absentDays);
        summary.put(
                "attendancePercentage",
                Math.round(attendancePercentage * 100.0) / 100.0
        );

        return summary;
    }
}