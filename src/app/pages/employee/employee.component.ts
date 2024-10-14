import { Component, inject, signal, OnInit } from '@angular/core';
import { Employee } from '../../model/class/Employee';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  isFormVisible = signal<boolean>(false);
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];
  employeeIdToUpdate: number | null = null;
  isTableVisible = signal<boolean>(false);

  private masterService = inject(MasterService);
  router = inject(Router)

  ngOnInit(): void {
    this.getAllEmployees();
  }

  onSave() {
    if (this.employeeIdToUpdate !== null) {
      this.masterService.updateEmployee(this.employeeIdToUpdate, this.employeeObj).subscribe(
        (result: any) => {
          alert("Employee updated successfully.");
          this.getAllEmployees();
          this.resetForm();
        },
        (error) => {
          console.error("Error:", error);
          alert("Failed to update employee: " + error.message);
        }
      );
    } else {
      this.masterService.createEmployee(this.employeeObj).subscribe(
        (result: any) => {
          alert("Employee created successfully.");
          this.getAllEmployees();
          this.resetForm();
        },
        (error) => {
          console.error("Error:", error);
          alert("Failed to create employee: " + error.message);
        }
      );
    }
  }

  getAllEmployees() {
    this.masterService.getAllEmployees().subscribe((result: Employee[]) => {
      this.employeeList = result;
    });
  }

  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.masterService.deleteEmployee(employeeId).subscribe(
        () => {
          alert("Employee deleted successfully.");
          this.getAllEmployees();
        },
        (error) => {
          console.error("Error deleting employee:", error);
        }
      );
    }
  }


  getDetails(employeeId: number): void {
    this.masterService.getEmployeeDetails(employeeId).subscribe(
      (data) => {
        this.employeeObj = data; 
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }
  

  updateEmployee(employee: Employee) {
    this.employeeObj = { ...employee }; 
    this.employeeIdToUpdate = employee.id; 
    this.isFormVisible.set(true); 
  }

  resetForm() {
    this.employeeObj = new Employee();
    this.employeeIdToUpdate = null;
    this.isFormVisible.set(false);
  }

}
