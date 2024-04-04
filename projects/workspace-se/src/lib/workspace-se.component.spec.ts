import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSeComponent } from './workspace-se.component';

describe('WorkspaceSeComponent', () => {
  let component: WorkspaceSeComponent;
  let fixture: ComponentFixture<WorkspaceSeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceSeComponent]
    });
    fixture = TestBed.createComponent(WorkspaceSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
