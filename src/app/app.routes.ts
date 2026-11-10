import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {path: '', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)},
        ]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {path: '', loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)},
            {path: 'projects', loadComponent: () => import('./features/projects/projects/projects.component').then(m => m.ProjectsComponent)},
            {path: 'my-tasks', loadComponent: () => import('./features/tasks/tasks/tasks.component').then(m => m.TasksComponent)},
            {path: 'members', loadComponent: () => import('./features/members/members/members.component').then(m => m.MembersComponent)},
            {path: 'notifications', loadComponent: () => import('./features/notifications/notifications/notifications.component').then(m => m.NotificationsComponent)},
        ]
    }
];
