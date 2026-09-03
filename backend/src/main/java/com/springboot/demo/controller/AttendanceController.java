package com.springboot.demo.controller;

import com.springboot.demo.entity.Attendance;
import com.springboot.demo.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "https://shine-star-employee-management-syst.vercel.app"
})
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // =========================
    // Mark Attendance
    // =========================
    @PostMapping
    public Attendance markAttendance(
            @RequestParam Long employeeId,
            @RequestParam String attendanceDate,
            @RequestParam String status) {

        LocalDate date = LocalDate.parse(attendanceDate.trim());

        return attendanceService.markAttendance(
                employeeId,
                date,
                status
        );
    }

    // =========================
    // Get Employee Attendance
    // =========================
    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getEmployeeAttendance(
            @PathVariable Long employeeId) {

        return attendanceService.getEmployeeAttendance(employeeId);
    }

    // =========================
    // Get Monthly Attendance
    // =========================
    @GetMapping("/employee/{employeeId}/monthly")
    public List<Attendance> getMonthlyAttendance(
            @PathVariable Long employeeId,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        LocalDate start = LocalDate.parse(startDate.trim());
        LocalDate end = LocalDate.parse(endDate.trim());

        return attendanceService.getMonthlyAttendance(
                employeeId,
                start,
                end
        );
    }

    // =========================
    // Attendance Summary
    // =========================
    @GetMapping("/employee/{employeeId}/summary")
    public Map<String, Object> getAttendanceSummary(
            @PathVariable Long employeeId,
            @RequestParam String startDate,
            @RequestParam String endDate) {

        LocalDate start = LocalDate.parse(startDate.trim());
        LocalDate end = LocalDate.parse(endDate.trim());

        return attendanceService.getAttendanceSummary(
                employeeId,
                start,
                end
        );
    }
}