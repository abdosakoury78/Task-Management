import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { Users } from '../../../shared/models/users';
import { ProjectMembers, Projects } from '../../../shared/models/projects';
import { Task } from '../../../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private apiUrl = "http://localhost:3000/";
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<Users[]>(`${this.apiUrl}users`);
  }

  getProjects() {
    return this.http.get<Projects[]>(
      `${this.apiUrl}projects`
    );
  }

  getTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}tasks`);
  }

  getProjectsId() {
    return this.http.get<ProjectMembers[]>(
      `${this.apiUrl}projectMembers`
    );
  }

  getMembers() {
    return forkJoin({
      users: this.getUsers(),
      projects: this.getProjects(),
      projectMembers: this.getProjectsId(),
      tasks: this.getTasks()
    }).pipe(
      map(({ users, projects, projectMembers, tasks }) => {

        return users.map(user => {

          const memberProjects = projectMembers
            .filter(pm => String(pm.userId) === String(user.id))
            .map(pm => projects.find(
              project => String(project.id) === String(pm.projectId)
            ))
            .filter(project => project !== undefined)
            .map(project => project.name);

          const memberTasks = tasks.filter(
            task => String(task.assigneeId) === String(user.id)
          );


          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            initials: user.initials,
            projectsName: memberProjects,
            tasks: memberTasks
          };

        });
      })
    );
  }
}
