import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, of, switchMap } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private httpService: HttpService) {}

  public workspaceId$ = new Subject<string>();
  private working: boolean = false;
  private accessToken: string = '';

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
    this.workspaceId$.next(id);
    this.working = true;
  }

  public removeWorkspace(): void {}
  public destroyWorkspace(): void {}
  public renderWorkspace(): void {}
}
