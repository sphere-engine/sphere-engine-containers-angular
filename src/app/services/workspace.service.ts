import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  public working$ = new BehaviorSubject(false);
  private accessToken: string = '77f3a4eb6cb94f0381978bdc25f4d6e7';
  private currentWorkspaceId: string = '';
  private workspaceIds: string[] = [];
  public eventResponse$ = new Subject<string>();

  public getWorkspaceId(): string {
    return this.currentWorkspaceId;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public changeWorkspace(id: string): void {
    const workspace = window.SE?.workspace('seco-workspace');
    workspace.destroy();

    const element = document.createElement('div');
    element.setAttribute('data-id', 'seco-workspace');
    element.setAttribute('id', 'seco-workspace');
    element.setAttribute('data-workspace', id);

    const workspaceDiv = document.getElementById('workspace');
    workspaceDiv?.appendChild(element);

    window.SE?.workspace('seco-workspace');
  }

  public createWorkspace(ids: string[]): void {
    this.working$.next(true);
    this.workspaceIds = ids;
    const element = document.getElementById('seco-workspace');
    element?.setAttribute('data-workspace', this.workspaceIds[0]);
    window.SE?.workspace('seco-workspace');
  }

  public removeWorkspace(): void {
    this.workspaceIds = [];
    this.currentWorkspaceId = '';
    const workspace = window.SE?.workspace('seco-workspace');

    const element = document.createElement('div');
    element.setAttribute('data-id', 'seco-workspace');
    element.setAttribute('id', 'seco-workspace');

    workspace.destroy();
    const workspaceDiv = document.getElementById('workspace');
    workspaceDiv?.appendChild(element);
    this.working$.next(false);
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
