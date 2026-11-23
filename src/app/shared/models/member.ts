import { Task } from "./task";

export interface Member {
    id:number;
    name:string;
    email:string;
    role:string;
    initials:string;
    projectsName:string[];
    tasks:Task[];
}
