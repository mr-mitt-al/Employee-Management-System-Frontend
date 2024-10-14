// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-change-password',
//   standalone: true,
//   imports: [],
//   templateUrl: './change-password.component.html',
//   styleUrl: './change-password.component.css'
// })
// export class ChangePasswordComponent {

// }

import { Component } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone:true,
  imports:[FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private masterService: MasterService, private router: Router) {}

  changePassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.masterService.changePassword(this.oldPassword, this.newPassword, this.confirmPassword).subscribe(
      response => {
        this.successMessage = response.message;
        console.log('Password changed successfully!', response);
      },
      error => {
        console.error('Error changing password', error);
        this.errorMessage = error.error?.old_password || 'An error occurred. Please try again.';
      }
    );
  }
}
