import { Component, ElementRef, ViewChild } from '@angular/core';
import { TasksBodyComponent } from '../tasks-body/tasks-body.component';

@Component({
  selector: 'app-tasks',
  imports: [TasksBodyComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  filterStatus: string = "all";

  changeStatus(status: string) {
    this.filterStatus = status;
  }

}
