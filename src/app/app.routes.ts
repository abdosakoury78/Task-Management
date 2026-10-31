import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {path: '', loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)},
            {path: 'projects', loadComponent: () => import('./features/projects/projects/projects.component').then(m => m.ProjectsComponent)},
            {path: 'my-tasks', loadComponent: () => import('./features/tasks/tasks/tasks.component').then(m => m.TasksComponent)},
        ]
    }
];
