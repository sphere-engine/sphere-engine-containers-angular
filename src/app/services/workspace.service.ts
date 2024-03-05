import { Injectable, OnDestroy } from '@angular/core';
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
export class WorkspaceService implements OnDestroy {
  constructor(private httpService: HttpService) {}

  public ngOnDestroy(): void {
    if (this.workspaceId !== '') {
      this.removeWorkspace();
    }
  }

  private projectId: string = '';
  public working$ = new BehaviorSubject(false);
  private accessToken: string = '';
  public workspaceId$ = new Subject<string>();
  private workspaceId: string = '';
  public eventResponse$ = new Subject<string>();

  public getWorkspaceId(): string {
    return this.workspaceId;
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
          this.working$.next(true);
          console.log('workspace created: ' + response.workspace.id);
        },
        error: (error) => {
          console.log(
            'ERROR: workspace could not be created' + error.error.message
          );
          this.working$.next(false);
        },
      });
  }

  public removeWorkspace(): void {
    this.httpService
      .removeWorkspace(this.accessToken, this.workspaceId)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.destroyWorkspace();
          this.working$.next(false);
        },
        error: (error: HttpErrorResponse) => console.log(error.error.message),
      });
  }

  // nie wiem jak to lepiej zrobić niż tak jak w vue jest
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

  // nie wiem jak to lepiej zrobić niż tak jak w vue jest
  public renderWorkspace(): void {
    const element = document.getElementById('seco-workspace');
    element?.setAttribute('data-workspace', this.workspaceId);
    window.SE.workspace('seco-workspace');
  }

  public handleChange(e: any): void {
    console.log(JSON.stringify(e.data));
    // nie podoba mi się to że handler musi ustawiać wartość elementu w DOM
    // jak próbuje przypisać tu e.data do Subject to otrzymuje cannot read null :(
    // this.eventResponse$.next(JSON.stringify(e.data));
    const textarea = document.getElementById('event-response');
    (textarea as HTMLInputElement).value = JSON.stringify(e.data);
  }

  public subscribe(event: string): void {
    console.log('Subscribed: ' + event);
    let workspace = window.SE.workspace('seco-workspace');
    workspace.events.subscribe(event, this.handleChange);
  }

  public unsubscribe(event: string): void {
    console.log('Unsubscribed: ' + event);
    let workspace = window.SE.workspace('seco-workspace');
    workspace.events.unsubscribe(event, this.handleChange);
  }
}
