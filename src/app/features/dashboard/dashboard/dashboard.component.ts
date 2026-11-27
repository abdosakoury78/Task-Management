import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { Projects } from '../../../shared/models/projects';
import { RouterLink } from '@angular/router';
import { Task } from '../../../shared/models/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  projects : Projects[] = [];
  tasks : Task[] = [];

  get user() {
    return this.authService.user() || JSON.parse(sessionStorage.getItem('user') || 'null');
  }

  get doneTasksCount() {
    return this.tasks.filter(t => t.status === "done").length;
  }

  ngOnInit(): void {
    const user = this.authService.user() || JSON.parse(sessionStorage.getItem('user') || 'null');

    if(!user) return;

    this.dashboardService.getProjects(user.id).subscribe({
      next: (projects => {
        this.projects = projects;
      })
    })

    this.dashboardService.getTasks(user.id).subscribe({
      next: (tasks => {
        this.tasks = tasks;
      })
    })
  }

  get recentProjects() {
    return this.projects.slice(0, 2).map(project => {
      const projectTasks = this.tasks.filter(
        task => task.projectId === project.id
      );

      return {
        ...project,
        totalTasks: projectTasks.length,
        completedTasks: projectTasks.filter(
          task => task.status === 'done'
        ).length
      };
    });
  }

  get upcomingDeadlines() {
    const today = new Date().toISOString().slice(0, 10);

    return this.tasks
      .filter(task =>
        task.status !== 'done' && task.dueDate >= today
      )
      .sort((a, b) =>
        a.dueDate.localeCompare(b.dueDate)
      )
      .slice(0, 2)
      .map(task => ({
        ...task,
        projectName: this.projects.find(
          project => project.id === task.projectId
        )?.name ?? 'Unknown Project'
      }));
  }
}
