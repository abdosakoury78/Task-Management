import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CurrentUser } from '../../models/users';
import { NotificationService } from '../../../features/notifications/services/notification.service';
import { Notification } from '../../../shared/models/notification';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  private authService = inject(AuthService);
  private notficationService = inject(NotificationService);
  notifications : Notification[] = [];

  ngOnInit(): void {
    this.notficationService.getAllNotifications(String(this.user?.id)).subscribe({
      next: (result => {this.notifications = result;
      this.notficationService.updateUnreadCount(
      result.filter(n => !n.read).length
    );})
    })
  }

  get unreadCount(): number {
    return this.notficationService.unReadCount();
  }

  get user() : CurrentUser | null {
    return this.authService.user() || JSON.parse(sessionStorage.getItem('user') || 'null');
  }
}
