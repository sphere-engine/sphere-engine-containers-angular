import { TestBed } from '@angular/core/testing';

import { WorkspaceSeService } from './workspace-se.service';

describe('WorkspaceSeService', () => {
  let service: WorkspaceSeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceSeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
