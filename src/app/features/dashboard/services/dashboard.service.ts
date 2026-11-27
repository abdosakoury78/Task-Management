import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectsService } from '../../projects/services/projects.service';
import { TasksService } from '../../tasks/services/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/';
  private projectService = inject(ProjectsService);
  private taskService = inject(TasksService);

  getProjects(userId : string) {
    return this.projectService.getProjectsByUserId(userId);
  }

  getTasks(userId : string) {
    return this.taskService.getTasksByUserId(userId);
  }
}
