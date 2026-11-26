import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Users } from '../../models/users';
import { NotificationService } from '../../../features/notifications/services/notification.service';
import { Notification } from '../../../shared/models/notification';

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
  private notficationService = inject(NotificationService);
  notifications : Notification[] = [];

  ngOnInit(): void {
    this.user = this.authService.user() || JSON.parse(sessionStorage.getItem('user') || 'null');

    if (!this.user) {
      return;
    }

    this.notficationService.getAllNotifications(String(this.user.id)).subscribe({
      next: (result => {this.notifications = result;
      this.notficationService.updateUnreadCount(
      result.filter(n => !n.read).length
    );})
    })
  }

  get unreadCount(): number {
    return this.notficationService.unReadCount();
  }

  logout() {
    this.authService.isLoggedIn.set(false);
    this.authService.user.set(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']);
  }
}
