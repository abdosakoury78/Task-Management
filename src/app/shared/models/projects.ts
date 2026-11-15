export interface Projects {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'completed' | 'on-hold';
    progress: number;
    startDate: string;
    ownerId: string;
}


export interface ProjectMembers {
    id: string;
    projectId: string;
    userId: string;
}