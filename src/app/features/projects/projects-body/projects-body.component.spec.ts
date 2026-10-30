import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsBodyComponent } from './projects-body.component';

describe('ProjectsBodyComponent', () => {
  let component: ProjectsBodyComponent;
  let fixture: ComponentFixture<ProjectsBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
