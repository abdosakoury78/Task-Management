import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectsBodyComponent } from '../projects-body/projects-body.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [ProjectsBodyComponent, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  viewMode: 'list' | 'grid' = 'grid';
  searchTerm: string = "";

  changeViewMode(mode: 'list' | 'grid'){
    this.viewMode = mode;
  }

}
