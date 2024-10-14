import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/class/Employee';
import { Observable } from 'rxjs';
import { Login, VacationRequest } from '../model/interface/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = 'http://127.0.0.1:8000/employee-api/';

  constructor(private http: HttpClient) {}

  login(loginData: Login) {
    return this.http.post(`${this.apiUrl}login/`, loginData);
  }

  createEmployee(employee: Employee): Observable<any> {
    const formData = new FormData();

    formData.append('first_name', employee.first_name);
    formData.append('last_name', employee.last_name);
    formData.append('email', employee.email);
    formData.append('age', employee.age.toString());
    formData.append('phone_number', employee.phone_number);
    formData.append('position', employee.position);
    formData.append('description', employee.description);
    
    if (employee.profile_picture) {
      formData.append('profile_picture', employee.profile_picture); 
    }

    return this.http.post(`${this.apiUrl}employee/`, formData);  
  }


  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}employee/`);
  }

  
  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}employee/${employeeId}/`);
  }

  
  updateEmployee(employeeId: number, employee: Employee): Observable<any> {
    const formData = new FormData();

    
    formData.append('first_name', employee.first_name);
    formData.append('last_name', employee.last_name);
    formData.append('email', employee.email);
    formData.append('age', employee.age.toString());
    formData.append('phone_number', employee.phone_number);
    formData.append('position', employee.position);
    formData.append('description', employee.description);
    

    if (employee.profile_picture) {
      formData.append('profile_picture', employee.profile_picture);  
    }

    return this.http.patch(`${this.apiUrl}employee/${employeeId}/`, formData); 
  }

  
  getEmployeeDetails(employeeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}employee/${employeeId}/`);
  }

  createVacationRequest(formData: FormData): Observable<any> {
    // return this.http.post(this.vacationApiUrl, formData);
    return this.http.post(`${this.apiUrl}request-vacation/`, formData);
  }

  getAllVacationRequests(): Observable<VacationRequest[]> {
    return this.http.get<VacationRequest[]>(`${this.apiUrl}get-all-vacations/`);
  }

  updateVacationRequest(leaveId: number, statusData: { status: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}update-vacation/${leaveId}/`, statusData);
  }
  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const body = { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword };
    return this.http.post(`${this.apiUrl}change-password/`, body);
  }

  getEmployeeVacationRequests(): Observable<VacationRequest[]> {
    return this.http.get<VacationRequest[]>(`${this.apiUrl}my-vacation-requests/`);
  }
}
