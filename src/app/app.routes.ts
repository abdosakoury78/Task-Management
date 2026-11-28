import { Routes } from '@angular/router';

export const routes: Routes = [
    // Authentication Layout
    {
        path: '',
        loadComponent: () =>
            import('./layout/auth-layout/auth-layout.component')
                .then(m => m.AuthLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./features/auth/login/login.component')
                        .then(m => m.LoginComponent)
            }
        ]
    },

    // Main Dashboard Layout
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./layout/main-layout/main-layout.component')
                .then(m => m.MainLayoutComponent),
        children: [
            // Dashboard
            {
                path: '',
                loadComponent: () =>
                    import('./features/dashboard/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent)
            },

            // Projects
            {
                path: 'projects',
                loadComponent: () =>
                    import('./features/projects/projects/projects.component')
                        .then(m => m.ProjectsComponent)
            },

            // My Tasks
            {
                path: 'my-tasks',
                loadComponent: () =>
                    import('./features/tasks/tasks/tasks.component')
                        .then(m => m.TasksComponent)
            },

            // Members
            {
                path: 'members',
                loadComponent: () =>
                    import('./features/members/members/members.component')
                        .then(m => m.MembersComponent)
            },

            // Notifications
            {
                path: 'notifications',
                loadComponent: () =>
                    import('./features/notifications/notifications/notifications.component')
                        .then(m => m.NotificationsComponent)
            },

            // Settings
            {
                path: 'settings',
                loadComponent: () =>
                    import('./features/settings/settings/settings.component')
                        .then(m => m.SettingsComponent),
                children: [
                    {
                        path: 'account',
                        loadComponent: () =>
                            import('./features/settings/account/account.component')
                                .then(m => m.AccountComponent)
                    },
                    {
                        path: 'security',
                        loadComponent: () =>
                            import('./features/settings/security/security.component')
                                .then(m => m.SecurityComponent)
                    },
                    {
                        path: '',
                        redirectTo: 'account',
                        pathMatch: 'full'
                    }
                ]
            }
        ]
    }
];