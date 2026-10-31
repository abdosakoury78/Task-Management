import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksBodyComponent } from './tasks-body.component';

describe('TasksBodyComponent', () => {
  let component: TasksBodyComponent;
  let fixture: ComponentFixture<TasksBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
