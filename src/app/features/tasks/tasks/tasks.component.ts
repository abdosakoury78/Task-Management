import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TasksBodyComponent } from '../tasks-body/tasks-body.component';
import { TasksService } from '../services/tasks.service';
import { Task } from '../../../shared/models/task';
import { AuthService } from '../../../core/services/auth.service';
import { Users } from '../../../shared/models/users';

@Component({
  selector: 'app-tasks',
  imports: [TasksBodyComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  filterStatus: string = "all";
  private taskService = inject(TasksService);
  private authService = inject(AuthService);
  user : Users | null = null;
  tasks : Task[] = [];

  ngOnInit() {
    this.user = this.authService.user() || sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) : null;

    if (this.user) {
      this.taskService.getTasksByUserId(String(this.user.id)).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    }
  }

  changeStatus(status: string) {
    this.filterStatus = status;
  }

  get todoTasks() {
    return this.tasks.filter(task => task.status === 'todo');
  }

  get inProgressTasks() {
    return this.tasks.filter(task => task.status === 'in-progress');
  }

  get doneTasks() {
    return this.tasks.filter(task => task.status === 'done');
  }
}
