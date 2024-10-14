import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { VacationRequest } from '../../model/interface/master';

@Component({
  selector: 'app-employee-vacation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-vacation.component.html',
  styleUrls: ['./employee-vacation.component.css'],
  providers: [DatePipe]
})
export class EmployeeVacationComponent implements OnInit {
  vacationRequests: VacationRequest[] = [];

  constructor(private masterService: MasterService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit() {
    this.fetchVacationRequests();
  }

  fetchVacationRequests() {
    this.masterService.getAllVacationRequests().subscribe(
      (data: VacationRequest[]) => {
        this.vacationRequests = data.map(request => ({
          ...request,
          start_date: this.formatDate(request.start_date),
          end_date: this.formatDate(request.end_date),
          leave_requested_at: this.formatDate(request.leave_requested_at)
        }));
        console.log('Fetched vacation requests:', this.vacationRequests);
      },
      error => {
        console.error('Error fetching vacation requests', error);
      }
    );
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || date;
  }

  updateStatus(leaveId: number, newStatus: string) {
    if (leaveId === undefined) {
      console.error('Leave ID is undefined. Cannot update status.');
      return;
    }
    this.masterService.updateVacationRequest(leaveId, { status: newStatus }).subscribe(
      response => {
        console.log("Leave status updated successfully", response);
        this.fetchVacationRequests();
      },
      error => {
        console.error('Error updating vacation request', error);
      }
    );
  }
}
