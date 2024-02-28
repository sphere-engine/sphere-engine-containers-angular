import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, switchMap } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private httpService: HttpService) {}

  public projectId: string = '';
  private working: boolean = false;
  private accessToken: string = '';
  public workspaceId$ = new Subject<string>();

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
          this.working = true;
          console.log('workspace created: ' + response.workspace.id);
        },
        error: (error) =>
          console.log(
            'ERROR: workspace could not be created' + error.error.message
          ),
      });
  }

  public removeWorkspace(): void {}
  public destroyWorkspace(): void {}
  public renderWorkspace(): void {}
}
