import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VacationRequest } from '../../model/interface/master';

@Component({
  selector: 'app-vacation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  employeeId: number | undefined;
  start_date: string | undefined; 
  end_date: string | undefined; 
  reason: string = '';
  attached_file: File | undefined;
  vacationRequests: VacationRequest[] = [];
  showVacations: boolean = false;

  constructor(
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.employeeId = idParam ? +idParam : undefined;
  }

  onFileChange(event: any) {
    this.attached_file = event.target.files[0];
  }

  submitVacationRequest() {
    if (!this.start_date || !this.end_date) {
      window.alert('Start date and end date are required');
      return;
    }

    const formData = new FormData();
    formData.append('start_date', this.start_date); 
    formData.append('end_date', this.end_date); 
    formData.append('reason', this.reason);

    if (this.attached_file) {
      formData.append('attached_file', this.attached_file);
    }

    this.masterService.createVacationRequest(formData).subscribe(
      response => {
        console.log('Vacation request submitted successfully!', response);
        window.alert('Vacation request submitted successfully!');
      },
      error => {
        console.error('Error submitting vacation request', error);
        const errorMessage = error.error?.error || 'An error occurred. Please try again.';
        window.alert(errorMessage);
      }
    );
  }
  fetchVacationRequests() {
    this.masterService.getEmployeeVacationRequests().subscribe(
      (data: VacationRequest[]) => {
        this.vacationRequests = data;
        this.showVacations = true;
      },
      error => {
        console.error('Error fetching vacation requests', error);
      }
    );
  }
  closeVacations(){
    this.showVacations=false;
  }
}
