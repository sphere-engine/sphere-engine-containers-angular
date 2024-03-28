import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Workspace } from '../models/workspace.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  public working$ = new BehaviorSubject(false);
  private accessToken: string = '77f3a4eb6cb94f0381978bdc25f4d6e7';
  private currentWorkspaceId: string = '';
  private subscribedId: string = '';
  private workspaces: Workspace[] = [];
  private ws: any[] = [];
  // public eventResponse$ = new Subject<string>();

  public getWorkspaceId(): string {
    return this.currentWorkspaceId;
  }

  public addWorkspace(workspace: any): void {
    this.ws.push(workspace);
  }

  public setCurrentWorkspaceId(id: string): void {
    this.currentWorkspaceId = id;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public createWorkspace(workspaces: Workspace[]): void {
    this.working$.next(true);
    this.workspaces = workspaces;
    this.currentWorkspaceId = workspaces[0].id;
  }

  public removeWorkspace(i: string): void {
    const workspaceToRemove = this.workspaces.findIndex((x) => x.id === i);
    this.ws[workspaceToRemove].destroy();
    this.ws = this.ws.filter((x, id) => id !== workspaceToRemove);
    this.workspaces = this.workspaces.filter((x) => x.id !== i);
    if (this.workspaces.length === 0) {
      this.working$.next(false);
    } else {
      this.currentWorkspaceId = this.workspaces[0].id;
    }
  }

  handleChange = (e: any): void => {
    console.log(JSON.stringify(e.data));
    // nie podoba mi się to że handler musi ustawiać wartość elementu w DOM
    // jak próbuje przypisać tu e.data do Subject to otrzymuje cannot read null :(
    // this.eventResponse$.next(JSON.stringify(e.data));
    const textarea = document.getElementById('event-response');
    (textarea as HTMLInputElement).value += '=======NEXT EVENT========\n';
    (textarea as HTMLInputElement).value += JSON.stringify(e.data, null, 2);
    (textarea as HTMLInputElement).value += '\n';
  };

  public subscribe(event: string): string {
    console.log('Subscribed: ' + event);
    this.subscribedId = this.currentWorkspaceId;
    let workspace = window.SE.workspace(this.subscribedId);
    workspace.events.subscribe(event, this.handleChange);
    return this.subscribedId;
  }

  public unsubscribe(event: string): void {
    console.log('Unsubscribed: ' + event);
    let workspace = window.SE.workspace(this.subscribedId);
    workspace.events.unsubscribe(event, this.handleChange);
  }
}
