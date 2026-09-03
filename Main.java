import java.util.ArrayList;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {

    ArrayList<Employee> employees = new ArrayList<>();
    Scanner scanner = new Scanner(System.in);

    boolean running = true;

    while (running) {

      System.out.println("\n========================================");
      System.out.println("          SHINE STAR EMS");
      System.out.println("========================================");
      System.out.println("1. Add Employee");
      System.out.println("2. View All Employees");
      System.out.println("3. Search Employee");
      System.out.println("4. Update Employee");
      System.out.println("5. Delete Employee");
      System.out.println("6. Exit");
      System.out.println("========================================");

      System.out.print("Enter your choice: ");
      int choice = scanner.nextInt();
      scanner.nextLine();

      switch (choice) {

        case 1:
          System.out.println("\n--- Add Employee ---");

          System.out.print("Enter Employee ID: ");
          String employeeId = scanner.nextLine();

          System.out.print("Enter Name: ");
          String name = scanner.nextLine();

          System.out.print("Enter Email: ");
          String email = scanner.nextLine();

          System.out.print("Enter Phone: ");
          String phone = scanner.nextLine();

          System.out.print("Enter Department: ");
          String department = scanner.nextLine();

          System.out.print("Enter Designation: ");
          String designation = scanner.nextLine();

          System.out.print("Enter Branch: ");
          String branch = scanner.nextLine();

          System.out.print("Enter Salary: ");
          double salary = scanner.nextDouble();
          scanner.nextLine();

          System.out.print("Enter Joining Date: ");
          String joiningDate = scanner.nextLine();

          System.out.print("Enter Status: ");
          String status = scanner.nextLine();

          Employee employee = new Employee(
              employeeId,
              name,
              email,
              phone,
              department,
              designation,
              branch,
              salary,
              joiningDate,
              status);

          employees.add(employee);

          System.out.println("\nEmployee added successfully!");
          break;

        case 2:
          System.out.println("\n--- All Employees ---");

          if (employees.isEmpty()) {
            System.out.println("No employees found.");
          } else {
            for (Employee emp : employees) {
              emp.displayEmployee();
            }
          }
          break;

        case 3:
          System.out.println("\n--- Search Employee ---");

          System.out.print("Enter Employee ID: ");
          String searchId = scanner.nextLine();

          boolean found = false;

          for (Employee emp : employees) {
            if (emp.getEmployeeId().equals(searchId)) {
              emp.displayEmployee();
              found = true;
              break;
            }
          }

          if (!found) {
            System.out.println("Employee not found.");
          }
          break;

        case 4:
          System.out.println("\n--- Update Employee ---");

          System.out.print("Enter Employee ID: ");
          String updateId = scanner.nextLine();

          boolean employeeFound = false;

          for (Employee emp : employees) {

            if (emp.getEmployeeId().equals(updateId)) {

              found = true;

              System.out.print("Enter New Name: ");
              String newName = scanner.nextLine();

              System.out.print("Enter New Email: ");
              String newEmail = scanner.nextLine();

              System.out.print("Enter New Phone: ");
              String newPhone = scanner.nextLine();

              System.out.print("Enter New Department: ");
              String newDepartment = scanner.nextLine();

              System.out.print("Enter New Designation: ");
              String newDesignation = scanner.nextLine();

              System.out.print("Enter New Branch: ");
              String newBranch = scanner.nextLine();

              System.out.print("Enter New Salary: ");
              double newSalary = scanner.nextDouble();
              scanner.nextLine();

              System.out.print("Enter New Joining Date: ");
              String newJoiningDate = scanner.nextLine();

              System.out.print("Enter New Status: ");
              String newStatus = scanner.nextLine();

              emp.setName(newName);
              emp.setEmail(newEmail);
              emp.setPhone(newPhone);
              emp.setDepartment(newDepartment);
              emp.setDesignation(newDesignation);
              emp.setBranch(newBranch);
              emp.setSalary(newSalary);
              emp.setJoiningDate(newJoiningDate);
              emp.setStatus(newStatus);

              System.out.println("\nEmployee updated successfully!");

              break;
            }
          }

          if (!employeeFound) {
            System.out.println("Employee not found.");
          }

          break;

        case 5:
          System.out.println("\n--- Delete Employee ---");

          System.out.print("Enter Employee ID: ");
          String deleteId = scanner.nextLine();

          boolean deleted = false;

          for (int i = 0; i < employees.size(); i++) {

            if (employees.get(i).getEmployeeId().equals(deleteId)) {

              employees.remove(i);
              deleted = true;

              System.out.println("Employee deleted successfully.");
              break;
            }
          }

          if (!deleted) {
            System.out.println("Employee not found.");
          }

          break;

        case 6:
          running = false;
          System.out.println("\nThank you for using Shine Star EMS!");
          break;

        default:
          System.out.println("\nInvalid choice. Please try again.");
      }
    }

    scanner.close();
  }
}