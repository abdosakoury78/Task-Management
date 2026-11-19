import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../../shared/models/task';
import { map, of, switchMap } from 'rxjs';
import { ProjectsService } from '../../projects/services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'http://localhost:3000/';
  private http = inject(HttpClient);
  private projectsService = inject(ProjectsService);

  getTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}tasks`);
  }

  getTasksByUserId(userId: string) {
    return this.getTasks().pipe(
      map(tasks => tasks.filter((task: Task) => String(task.assigneeId) === userId))
    )
  }

  getProjectIds(userId: string) {
    return this.getTasksByUserId(userId).pipe(
      map(tasks => tasks.map((task: Task) => String(task.projectId)))
    )
  }

  getProjectsByUserId(userId: string) {
    return this.getProjectIds(userId).pipe(
      switchMap(projectIds => {
        if (projectIds.length === 0) {
          return of([]);
        }
        const ids = new Set(projectIds);
        return this.projectsService.getProjects().pipe(
          map(projects => projects.filter(project => ids.has(String(project.id))))
        );
      })
    )
  }
}
