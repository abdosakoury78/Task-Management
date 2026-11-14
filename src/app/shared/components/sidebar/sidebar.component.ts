import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Users } from '../../models/users';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  user!: Users | null;

  ngOnInit(): void {
    this.user = this.authService.user() || JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  logout() {
    this.authService.isLoggedIn.set(false);
    this.authService.user.set(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}
