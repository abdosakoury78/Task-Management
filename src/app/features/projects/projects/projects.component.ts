import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectsBodyComponent } from '../projects-body/projects-body.component';

@Component({
  selector: 'app-projects',
  imports: [ProjectsBodyComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  viewMode: 'list' | 'grid' = 'grid';

  changeViewMode(mode: 'list' | 'grid'){
    this.viewMode = mode;
  }
}
