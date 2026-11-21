import { Component, inject, Input, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Projects } from '../../../shared/models/projects';
import { Task, TaskWithProjectName } from '../../../shared/models/task';
import { Users } from '../../../shared/models/users';
import { AuthService } from '../../../core/services/auth.service';
import {DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-body',
  imports: [DatePipe, FormsModule],
  templateUrl: './tasks-body.component.html',
  styleUrl: './tasks-body.component.css'
})
export class TasksBodyComponent implements OnInit {
  private tasksService = inject(TasksService);
  private authService = inject(AuthService);
  projects: Projects[] = [];
  tasks: Task[] = [];
  user : Users | null = null;
  selectedProjectId: string = 'all';
  selectedPriority: string = 'all';
  @Input() selectedStatus!: string;
  searchTerm: string = '';
  // tasksWithProjectName : TaskWithProjectName[] = [];

  ngOnInit() {
    this.user = this.authService.user() || sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) : null;
    if (this.user) {

      this.tasksService.getProjectsByUserId(String(this.user.id)).subscribe((projects: Projects[]) => {
        this.projects = projects;
      });

      this.tasksService.getTasksByUserId(String(this.user.id)).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    }
  }


  getTasksWithProjectName(): TaskWithProjectName[] {
    return this.tasks.map(task => {
      const project = this.projects.find(project => String(project.id) === task.projectId);
      const projectName = project ? project.name : '';
      return { ...task, projectName };
    });
  }

  getFilteredTasks(): TaskWithProjectName[] {
    const tasksWithProjectName = this.searchTasks(this.searchTerm);

    return tasksWithProjectName.filter(task => {
      const matchesProject =
        this.selectedProjectId === 'all' ||
        task.projectId === this.selectedProjectId;

      const matchesPriority =
        this.selectedPriority === 'all' ||
        task.priority === this.selectedPriority;

      const matchesStatus =
        this.selectedStatus === 'all' ||
        task.status === this.selectedStatus;

      return matchesProject && matchesPriority && matchesStatus;
    });
  }

  searchTasks(searchTerm: string): TaskWithProjectName[] {
    const tasksWithProjectName = this.getTasksWithProjectName();
    searchTerm = searchTerm.trim().toLowerCase();
    return tasksWithProjectName.filter(task => {
      return task.title.toLowerCase().includes(searchTerm);
    });
  }
}
