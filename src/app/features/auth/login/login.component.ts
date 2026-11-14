import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CurrentUser, Users } from '../../../shared/models/users';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  private authService = inject(AuthService);
  private router = inject(Router);
  user!: Users;

  alertType: 'success' | 'error' | 'warning' | 'info' = 'info';
  alertTitle = '';
  alertMessage = '';
  showAlert = false;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    })
  }
// // , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/)]

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email).subscribe({

      next: (users: Users[]) => {
        if (users.length > 0) {

          this.user = users.filter(user => user.password === password)[0];

          if (!this.user) {
            this.alertType = 'error';
            this.alertTitle = 'Login Failed';
            this.alertMessage = 'Invalid password';
            this.showAlert = true;
            return;
          }

          this.alertType = 'success';
          this.alertTitle = 'Login Successful';
          this.alertMessage = 'Welcome back to TaskFlow!';
          this.showAlert = true;

          this.authService.isLoggedIn.set(true);
          this.authService.user.set(this.user);

          const { password: _, ...safeUser } = this.user;
          const currentUser: CurrentUser = safeUser;

          sessionStorage.setItem('user', JSON.stringify(currentUser));
          sessionStorage.setItem('isLoggedIn', 'true');

          this.router.navigate(['/dashboard']);

        } else {

          this.alertType = 'error';
          this.alertTitle = 'Login Failed';
          this.alertMessage = 'Invalid email';
          this.showAlert = true;

        }

      },

      error: (error) => {

        console.error('Login error:', error);

        this.alertType = 'error';
        this.alertTitle = 'Server Error';
        this.alertMessage = 'Unable to connect to the server. Please try again.';
        this.showAlert = true;

      }

    });
  }

  closeAlert(): void {
    this.showAlert = false;
  }
}
