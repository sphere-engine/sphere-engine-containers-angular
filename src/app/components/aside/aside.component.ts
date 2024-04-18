import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { Event, Workspace } from 'src/app/models/workspace.model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  public constructor(private workspaceService: WorkspaceService) {}

  public ngOnInit(): void {
    this.workspaceService.working$.subscribe({
      next: (value) => {
        this.isWorkspaceWorking = value;
      },
    });

    // this.workspaceService.eventResponse$.subscribe({
    //   next: (value) => {
    //     this.eventResponse = value;
    //   },
    // });
  }

  protected workspaces: Workspace[] = [];
  protected workspaceId: string = '';
  protected showModal: boolean = false;
  protected eventResponse: string = '';
  @ViewChild('eventResponseTextarea') eventResponseTextarea!: ElementRef;
  protected isWorkspaceWorking: boolean = false;
  protected isCurrentSubscribed: boolean = false;
  protected anySubscribed: boolean = false;
  protected keyForRefresh: number = 1;
  protected bigSize: boolean = true;
  protected showWorkspaceId: number = 0;
  protected subscribedId: string[] = [];
  protected isCurrentLoaded = false;

  public addWorkspace(ws: any): void {
    this.workspaces.map((x) => {
      if (x.id === ws.id) {
        x.loaded = true;
        this.isCurrentLoaded = true;
      }
    });
    this.workspaceService.addWorkspace(ws);
  }

  public setCurrentWorkspace(id: number): void {
    this.showWorkspaceId = id;
    this.workspaceId = this.workspaces[id].id;
    this.workspaceService.setCurrentWorkspaceId(this.workspaceId);
    this.isCurrentSubscribed = this.workspaces[id].subscribed;
    this.isCurrentLoaded = this.workspaces[id].loaded;
  }

  public resize(id: number): void {
    this.workspaces[id].bigSize = !this.workspaces[id].bigSize;
  }

  public clearEvent(): void {
    this.eventResponseTextarea.nativeElement.value = '';
  }

  public displayModal(): void {
    this.showModal = !this.showModal;
    this.keyForRefresh++;
  }

  public createWorkspace(workspaceIds: string[]): void {
    this.showWorkspaceId = 0;
    this.workspaceId = workspaceIds[this.showWorkspaceId];
    this.workspaces = workspaceIds.map((x, i) => ({
      id: x,
      bigSize: true,
      events: [
        { name: 'afterScenarioExecution', subscribed: false },
        { name: 'afterScenarioExecutionExt', subscribed: false },
        { name: 'fileContent', subscribed: false },
        { name: 'stageStream', subscribed: false },
      ],
      subscribed: false,
      show: true,
      loaded: false,
    }));
    this.workspaceService.createWorkspace(this.workspaces);
  }

  public removeWorkspace(i: string): void {
    this.unsubscribeEvent();
    this.workspaceService.removeWorkspace(i);
    this.workspaces = this.workspaces.filter((x) => x.id !== i);
    this.workspaceId = '';
    this.showWorkspaceId = -1;
    this.keyForRefresh += 1;
  }
  public destroyWorkspace(i: number): void {
    this.workspaces[i].show = false;
  }
  public renderWorkspace(i: number): void {
    this.workspaces[i].show = true;
    this.keyForRefresh++;
  }
  public subscribeEvent(): void {
    this.workspaces[this.showWorkspaceId].events.forEach((x) => {
      if (x.subscribed) {
        this.workspaceService.subscribe(x.name);
        this.workspaces[this.showWorkspaceId].subscribed = true;
        this.anySubscribed = true;
        this.isCurrentSubscribed = true;
      }
    });
    this.subscribedId.push(this.workspaceId);
  }
  public unsubscribeEvent(): void {
    this.workspaces[this.showWorkspaceId].events.forEach((x) => {
      if (x.subscribed) {
        this.workspaceService.unsubscribe(x.name);
      }
      this.workspaces[this.showWorkspaceId].subscribed = false;
      this.isCurrentSubscribed = false;
      if (this.subscribedId.length === 0) {
        this.anySubscribed = false;
      }
      this.subscribedId = this.subscribedId.filter(
        (ele) => ele !== this.workspaceId
      );
    });
  }
}
