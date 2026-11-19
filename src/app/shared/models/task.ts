export interface Task {
    id: string;
    title: string;
    description: string;
    projectId: string;
    assigneeId: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate: string; // ISO 8601 date format
}

export interface TaskWithProjectName extends Task {
    projectName: string;
}