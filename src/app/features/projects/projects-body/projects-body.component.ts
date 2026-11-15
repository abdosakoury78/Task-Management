
import { Component, inject, Input, OnInit } from '@angular/core';
import { Projects } from '../../../shared/models/projects';
import { ProjectsService } from '../services/projects.service';
import { AuthService } from '../../../core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects-body',
  imports: [DatePipe],
  templateUrl: './projects-body.component.html',
  styleUrl: './projects-body.component.css'
})
export class ProjectsBodyComponent implements OnInit {
  @Input() viewMode: 'list' | 'grid' = 'grid';

  private projectsService = inject(ProjectsService);
  private authService = inject(AuthService);

  projects: Projects[] = [];

  ngOnInit(): void {
    const user = this.authService.user() || sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')!) : null;

    if (!user) {
      return;
    }

    this.projectsService.getProjectsByUserId(String(user.id))
      .subscribe({
        next: projects => {
          this.projects = projects;
        },
        error: error => {
          console.error('Failed to load projects:', error);
        }
      });
  }
}
