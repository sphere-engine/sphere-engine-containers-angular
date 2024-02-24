import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor() {}

  public workspaceId$ = new Subject<string>();
  private working: boolean = false;

  public getIsWorking(): boolean {
    return this.working;
  }

  public createWorkspace(id: string): void {
    this.workspaceId$.next(id);
    this.working = true;
  }

  public removeWorkspace(): void {}
  public destroyWorkspace(): void {}
  public renderWorkspace(): void {}
}
