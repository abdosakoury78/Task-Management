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
  @ViewChild("gridBtn") gridBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild("listBtn") listBtn!: ElementRef<HTMLButtonElement>;

  changeViewMode(mode: 'list' | 'grid'){
    this.viewMode = mode;

    if(this.gridBtn && this.listBtn){
      if(mode === 'grid'){
        this.gridBtn.nativeElement.classList.add('active');
        this.listBtn.nativeElement.classList.remove('active');
        console.log(this.gridBtn.nativeElement.classList);
      }else {
        this.gridBtn.nativeElement.classList.remove('active');
        this.listBtn.nativeElement.classList.add('active');
        console.log(this.gridBtn.nativeElement.classList);
      }
    }
  }
}
