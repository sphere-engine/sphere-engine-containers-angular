import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  of,
  switchMap,
} from 'rxjs';
import { HttpService } from './http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private httpService: HttpService) {}

  private projectId: string = '';
  private working: boolean = false;
  private accessToken: string = '';
  public workspaceId$ = new Subject<string>();
  private workspaceId: string = '';

  public getIsWorking(): boolean {
    return this.working;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public saveToken(token: string): Observable<boolean> {
    try {
      if (token) {
        return this.httpService.testToken(token).pipe(
          switchMap((value) => {
            if (value.message === 'You can use Sphere Engine Containers API') {
              this.accessToken = token;
              return of(true);
            } else {
              return of(false);
            }
          }),
          catchError((error) => {
            console.log(error);
            return of(false);
          })
        );
      } else {
        return of(false);
      }
    } catch (err) {
      console.log(err);
      return of(false);
    }
  }

  public createWorkspace(id: string): void {
    this.projectId = id;
    this.httpService
      .createWorkspace(this.accessToken, this.projectId)
      .subscribe({
        next: (response) => {
          this.workspaceId$.next(response.workspace.id);
          this.workspaceId = response.workspace.id;
          this.working = true;
          console.log('workspace created: ' + response.workspace.id);
        },
        error: (error) =>
          console.log(
            'ERROR: workspace could not be created' + error.error.message
          ),
      });
  }

  public removeWorkspace(): void {
    this.httpService
      .removeWorkspace(this.accessToken, this.workspaceId)
      .subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (error: HttpErrorResponse) => console.log(error.error.message),
      });
  }

  public destroyWorkspace(): void {
    const workspace = window.SE.workspace('seco-workspace');

    if (workspace) {
      workspace.destroy();

      const element = document.createElement('div');
      element.setAttribute('data-id', 'seco-workspace');
      element.setAttribute('id', 'seco-workspace');

      const workspaceDiv = document.getElementById('workspace');
      workspaceDiv?.appendChild(element);
    }
  }

  public renderWorkspace(): void {
    const element = document.getElementById('seco-workspace');
    element?.setAttribute('data-workspace', this.workspaceId);
    const workspace = window.SE.workspace('seco-workspace');
    if (!workspace) {
      window.SE.create(
        'seco-workspace',
        document.getElementById('seco-workspace')
      );
    }
  }
}
