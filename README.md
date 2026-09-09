# 🌟 Shine Star – Employee Management System

A full-stack Employee Management System built to simplify employee administration, attendance tracking, and workforce management through a clean and responsive web interface.

Built using **React.js, Spring Boot, REST API, and MySQL**, the application provides an admin dashboard for managing employee records, searching employees, tracking attendance, and viewing employee information.

---

## 🎯 Project Overview

**Shine Star – Employee Management System** is a full-stack web application developed for centralized employee and attendance management.

The system allows an administrator to:

- Manage employee records
- Add new employees
- View employee information
- Search employees
- Update employee details
- Delete employees
- Track employee attendance
- View attendance summaries
- Monitor employee statistics
- Access protected application routes

The frontend communicates with the Spring Boot backend through REST APIs, while MySQL is used to store application data.

---

## 💡 Why I Built This

Managing employee information manually can make it difficult to maintain records, search for employees, update information, and track attendance efficiently.

I built **Shine Star** to provide a centralized web-based solution for employee management and attendance tracking.

This project helped me gain practical experience with:

- Full-stack web development
- React.js
- Spring Boot
- REST API development
- MySQL database integration
- Axios API communication
- CRUD operations
- React Router
- Protected routes
- Frontend and backend integration
- Application deployment

---

## 🚀 Live Demo

**Live Application:**  
https://shine-star-employee-management-syst.vercel.app

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

The employee list includes search functionality to quickly find employees.

### 📋 Employee Details

Each employee has a dedicated details/profile view containing important employee information.

### 📅 Attendance Management

Administrators can:

- Select an employee
- Select an attendance date
- Mark attendance
- Set attendance status
- View attendance records

### 📈 Attendance Summary

The system provides attendance summaries for employees based on a selected date range.

### ⚙️ Settings

The application includes a dedicated settings section for application-related options.

### 🛡️ Protected Routes

Important application pages are protected through a route-protection mechanism so users must complete the login flow before accessing the main application.

---

# 🔄 How the System Works

The application follows a full-stack architecture where the React frontend communicates with the Spring Boot backend through REST APIs.

```text
                    ┌─────────────────────┐
                    │      Admin Login    │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │      Dashboard      │
                    └──────────┬──────────┘
                               ↓
          ┌────────────────────┼────────────────────┐
          ↓                    ↓                    ↓
     Employees            Attendance            Settings
          ↓                    ↓
   Add / Edit /          Mark Attendance
   Delete / Search       Attendance Summary
          │                    │
          └──────────┬─────────┘
                     ↓
            ┌──────────────────┐
            │   Spring Boot    │
            │    REST API      │
            └────────┬─────────┘
                     ↓
            ┌──────────────────┐
            │      MySQL       │
            │     Database     │
            └──────────────────┘
