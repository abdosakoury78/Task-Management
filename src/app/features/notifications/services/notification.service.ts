import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Users } from '../../../shared/models/users';
import { forkJoin, map, switchMap } from 'rxjs';
import { Notification } from '../../../shared/models/notification';
import { Task } from '../../../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/';
  private unreadCount = signal(0);

  updateUnreadCount(count : number) {
    this.unreadCount.set(count);
  }

  unReadCount() {
    return this.unreadCount();
  }

  getNotifications() {
    return this.http.get<Notification[]>(`${this.apiUrl}notifications`);
  }

  getUsers() {
    return this.http.get<Users[]>(`${this.apiUrl}users`);
  }

  getAllTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}tasks`);
  }

  getAllNotifications(userId: string) {
    return forkJoin({
      notifications: this.getNotifications(),
      users: this.getUsers(),
      tasks: this.getAllTasks()
    }).pipe(
      map(({ notifications, users, tasks }) => {

        return notifications
          .filter(n => String(n.recipientId) === userId)
          .map(notification => {

            const sender = users.find(
              u => String(u.id) === String(notification.actorId)
            );

            const task = tasks.find(
              t => String(t.id) === String(notification.taskId)
            );

            return {
              ...notification,
              sender,
              task
            };
          });
      })
    );
  }

  updateNotificationRead(notificationId : string, read : boolean) {
    return this.http.patch<Notification>(`${this.apiUrl}notifications/${notificationId}`, {
      read
    })
  }

  markAllNotificationsRead(userId : string) {
    return this.getNotifications().pipe(
      map(notifications => {
        return notifications.filter(n => String(n.recipientId) === userId && !n.read)
      }),
      switchMap(unreadNotifications => {
        if(unreadNotifications.length === 0) return of([]);

        return forkJoin(
          unreadNotifications.map(n => this.updateNotificationRead(String(n.id), true))
        )
      })
    )
  }
}
function of(arg0: never[]): any {
  throw new Error('Function not implemented.');
}

