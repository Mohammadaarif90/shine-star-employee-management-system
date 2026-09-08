# 🌟 Shine Star – Employee Management System

A full-stack Employee Management System designed to simplify employee administration, attendance tracking, and workforce management through a clean and responsive web interface.

Built using **React.js, Spring Boot, REST API, and MySQL**, the application provides an admin dashboard where employees can be added, viewed, searched, updated, deleted, and monitored through attendance records.

---

## 🎯 Project Overview

**Shine Star – Employee Management System** is a full-stack web application developed to manage employee information and attendance from a centralized dashboard.

The system provides an easy-to-use interface for administrators to:

- Manage employee records
- Search employees
- View employee details
- Update employee information
- Delete employees
- Track attendance
- View attendance summaries
- Monitor employee statistics
- Access protected application routes

The frontend communicates with the backend through REST APIs, while employee and attendance data are stored in a MySQL database.

---

## 💡 Why I Built This

Employee information is often managed using spreadsheets or disconnected systems, which can make searching, updating, and tracking records difficult.

I built **Shine Star** to create a centralized employee management solution where administrators can manage employee information and attendance through a single web application.

This project also helped me gain practical experience with:

- Full-stack application development
- React.js
- Spring Boot
- REST API development
- MySQL database integration
- Axios API communication
- CRUD operations
- React Router
- Protected routes
- Frontend and backend integration

---

## 🚀 Live Demo

👉 https://shine-star-employee-management-syst.vercel.app

---

## ✨ Key Features

### 🔐 Admin Login

- Admin login interface
- Login-based access to the application
- Protected application routes
- Logout functionality

### 📊 Dashboard

The dashboard provides an overview of employee information including:

- Total employees
- Active employees
- Inactive employees
- Recently added employees

### 👨‍💼 Employee Management

Administrators can:

- Add new employees
- View all employees
- Search employees
- View employee details
- Edit employee information
- Delete employees

### 🔍 Employee Search

Employees can be searched from the employee list using search functionality.

### 📋 Employee Details

The application provides a dedicated employee details/profile view containing important employee information.

### 📅 Attendance Management

Administrators can:

- Select an employee
- Mark attendance
- Select attendance date
- Set attendance status
- View attendance records

### 📈 Attendance Summary

The system provides an attendance summary for employees over a selected date/month range.

### ⚙️ Settings

A dedicated settings section is available for application-related configuration.

### 🛡️ Protected Routes

Application routes are protected so that users must pass through the login flow before accessing the main application pages.

---

# 🔄 How the System Works

The application follows a simple full-stack architecture:

```text
                ┌─────────────────────┐
                │      Admin Login    │
                └──────────┬──────────┘
                           ↓
                ┌─────────────────────┐
                │      Dashboard      │
                └──────────┬──────────┘
                           ↓
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
   Employees          Attendance          Settings
        ↓                  ↓
 Add / Edit /        Mark Attendance
 Delete / Search     Attendance Summary
        │                  │
        └──────────┬───────┘
                   ↓
          ┌─────────────────┐
          │   Spring Boot   │
          │    REST API     │
          └────────┬────────┘
                   ↓
          ┌─────────────────┐
          │      MySQL      │
          │    Database     │
          └─────────────────┘
