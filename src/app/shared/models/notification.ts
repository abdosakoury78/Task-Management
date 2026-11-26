import { Task } from "./task";
import { Users } from "./users";

export interface Notification {
    id:number;
    type:string;
    recipientId:number;
    actorId:number;
    taskId:number;
    read:boolean;
    createdAt:string
    sender?: Users
    task?: Task
}