import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Notification } from '../../../shared/models/notification';
import { NotificationService } from '../services/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  private authService = inject(AuthService);
  private notficationService = inject(NotificationService);
  notifications : Notification[] = [];

  ngOnInit(): void {
  const user = this.authService.user()
    ?? JSON.parse(sessionStorage.getItem('user') || 'null');

    if (!user) {
      return;
    }

    this.notficationService.getAllNotifications(String(user.id)).subscribe({
      next: (result => {this.notifications = result
        this.notficationService.updateUnreadCount(
          result.filter(n => !n.read).length
        );
      })
    })
  }

  get unreadCount(): number {
    return this.notficationService.unReadCount();
  }

  markRead(notification : Notification) {
    if(notification.read) return;

    this.notficationService.updateNotificationRead(String(notification.id), true).subscribe({
      next: (res => {notification.read = res.read
        this.notficationService.updateUnreadCount(Math.max(0, this.unreadCount - 1));
      })
    })
  }

  markAllRead() {
    if (this.unreadCount === 0) return;
    const user = this.authService.user()
    ?? JSON.parse(sessionStorage.getItem('user') || 'null');

    this.notficationService.markAllNotificationsRead(user.id)
      .subscribe({
        next: () => {
          this.notifications.forEach(notification => {
            notification.read = true;
          });
          this.notficationService.updateUnreadCount(0);
        },
        error: err => console.error('Failed to mark all as read:', err)
      });
  }
}
