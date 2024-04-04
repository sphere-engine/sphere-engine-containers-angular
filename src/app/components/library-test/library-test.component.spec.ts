import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryTestComponent } from './library-test.component';

describe('LibraryTestComponent', () => {
  let component: LibraryTestComponent;
  let fixture: ComponentFixture<LibraryTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryTestComponent]
    });
    fixture = TestBed.createComponent(LibraryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
