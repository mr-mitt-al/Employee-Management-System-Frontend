import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { Login } from '../../model/interface/master';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginObj: Login = {
    email: '',
    password: ''
  };

  private masterService = inject(MasterService);
  private router = inject(Router);

  onLogin() {
    this.masterService.login(this.loginObj).subscribe(
      (result: any) => {
        if (result.user && result.user.email === this.loginObj.email) {
          alert('Login Successful.');
          localStorage.setItem('userLoggedIn', result.user.id);
          localStorage.setItem('access', result.access);
          this.router.navigateByUrl('dashboard');
        }
      },
      error => {
        if (error.status === 401) {
          alert('Invalid credentials. Please check your Email ID or password.');
        } else {
          alert('An error occurred. Please try again.');
        }
      }
    );
  }
}
