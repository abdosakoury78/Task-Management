import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projects-body',
  imports: [],
  templateUrl: './projects-body.component.html',
  styleUrl: './projects-body.component.css'
})
export class ProjectsBodyComponent {
  @Input() viewMode: 'list' | 'grid' = 'grid';
}
