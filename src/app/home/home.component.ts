import { Component, inject,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { NgModule } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = inject(AuthService);
  user?: any;
  title = 'angapp';
  isEditing = false;  // Flag to show if we are editing an employee
  employeeToEdit: any = null;  // Holds the employee being edited

  users: any[] = [];
  employees: any[] = [];
  newEmployee = { id: 0, name: '', status: '' };

  constructor(private employeeService: EmployeeService) {
    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
      this.user = r;
    });
  }
  ngOnInit() {
    this.fetchEmployees();
  }
  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        console.log('Employees fetched:', data); // Verify data is fetched
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  onSubmit() {
    console.log('Adding employee:', this.newEmployee); // Debug log
    if (this.newEmployee.name) {
      this.newEmployee.id = this.employees.length + 1;
      this.employeeService.addEmployee(this.newEmployee).subscribe(
        () => {
          this.fetchEmployees(); // Refresh employee list
          this.newEmployee = { id: 0, name: '', status: '' };
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }
  
  deleteUser(id: number) {
    console.log('Deleting employee with id:', id); // Debug log
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.fetchEmployees(); // Refresh employee list after deletion
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }
  editEmployee(employee: any) {
    console.log('Editing employee:', employee);  // Debug log to check the passed data
    this.isEditing = true;  // Set the editing flag to true
    this.employeeToEdit = { ...employee };  // Create a copy of the employee to edit
  }
  

  // Update an employee's details
  updateEmployee() {
    if (this.employeeToEdit) {
      // Convert ID to a number (if it's a string)
      this.employeeToEdit.id = +this.employeeToEdit.id;
  
      this.employeeService.updateEmployee(this.employeeToEdit.id, this.employeeToEdit).subscribe(
        () => {
          console.log('Employee updated successfully');
          this.fetchEmployees();  // Refresh the employee list after updating
          this.isEditing = false;  // Hide the edit form
          this.employeeToEdit = null;  // Reset the employee being edited
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }
  
  logout() {
    this.authService.logout();
  }

  refreshToken() {
    this.authService.refreshToken()?.subscribe(() => {});
  }
}
