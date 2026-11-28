import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Users } from '../../../shared/models/users';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent, AlertType } from '../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  private authService = inject(AuthService);

  user: Users | null = null;

  showAlert = false;
  alertType: AlertType = 'success';
  alertTitle = '';
  alertMessage = '';

  accountForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.user = this.authService.user()
      ?? JSON.parse(sessionStorage.getItem('user') || 'null');

    if (!this.user) return;

    this.accountForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      role: this.user.role
    });
  }

  get initials(): string {
    return this.user?.initials || '';
  }

  saveChanges(): void {
    if (this.accountForm.invalid || !this.user) {
      this.accountForm.markAllAsTouched();
      return;
    }

    this.authService.updateUser(
      String(this.user.id),
      {
        name: this.accountForm.controls.name.value ?? '',
        email: this.accountForm.controls.email.value ?? '',
        role: this.accountForm.controls.role.value ?? ''
      }
    ).subscribe({
      next: updatedUser => {
        this.user = updatedUser;

        this.authService.user.set(updatedUser);
        sessionStorage.setItem('user', JSON.stringify(updatedUser));

        this.alertType = 'success';
        this.alertTitle = 'Changes Saved';
        this.alertMessage = 'Your account information has been updated successfully.';
        this.showAlert = true;
      },
      error: () => {
        this.alertType = 'error';
        this.alertTitle = 'Update Failed';
        this.alertMessage = 'Something went wrong while updating your account. Please try again.';
        this.showAlert = true;
      }
    });
  }

  closeAlert(): void {
    this.showAlert = false;
  }
}