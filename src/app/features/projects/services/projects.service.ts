
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { ProjectMembers, Projects } from '../../../shared/models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/';

  getProjectsId() {
    return this.http.get<ProjectMembers[]>(
      `${this.apiUrl}projectMembers`
    );
  }

  getProjects() {
    return this.http.get<Projects[]>(
      `${this.apiUrl}projects`
    );
  }

  getProjectsByUserId(userId: string) {
    return this.getProjectsId().pipe(
      map(members =>
        members
          .filter(member => String(member.userId) === userId)
          .map(member => String(member.projectId))
      ),
      switchMap(projectIds => {
        if (projectIds.length === 0) {
          return of([]);
        }

        const ids = new Set(projectIds);

        return this.getProjects().pipe(
          map(projects =>
            projects.filter(project => ids.has(String(project.id)))
          )
        );
      })
    );
  }
}
