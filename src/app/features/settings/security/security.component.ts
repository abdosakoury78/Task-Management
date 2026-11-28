import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { AlertComponent, AlertType } from '../../../shared/components/alert/alert.component';
import { Users } from '../../../shared/models/users';

@Component({
  selector: 'app-security',
  imports: [AlertComponent, ReactiveFormsModule],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css'
})
export class SecurityComponent implements OnInit {

  private authService = inject(AuthService);

  user: Users | null = null;

  showAlert = false;
  alertType: AlertType = 'success';
  alertTitle = '';
  alertMessage = '';

  securityForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.user = this.authService.user()
      ?? JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  saveChanges(): void {
    if (this.securityForm.invalid || !this.user) {
      this.securityForm.markAllAsTouched();
      return;
    }

    const { currentPassword, newPassword, confirmPassword } =
      this.securityForm.getRawValue();

    // Check current password
    if (currentPassword !== this.user.password) {
      this.securityForm.controls.currentPassword.setErrors({
        incorrectCurrentPassword: true
      });
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      this.securityForm.controls.confirmPassword.markAsTouched();
      return;
    }

    // Update password
    this.authService.updateUser(String(this.user.id), {
      password: newPassword!
    }).subscribe({
      next: updatedUser => {
        this.user = updatedUser;

        this.authService.user.set(updatedUser);
        sessionStorage.setItem('user', JSON.stringify(updatedUser));

        this.securityForm.reset();

        this.alertType = 'success';
        this.alertTitle = 'Password Updated';
        this.alertMessage = 'Your password has been changed successfully.';
        this.showAlert = true;
      },
      error: () => {
        this.alertType = 'error';
        this.alertTitle = 'Update Failed';
        this.alertMessage = 'Unable to update your password. Please try again.';
        this.showAlert = true;
      }
    });
  }

  closeAlert(): void {
    this.showAlert = false;
  }
}
