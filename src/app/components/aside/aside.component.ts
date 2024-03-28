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

  protected events: Event[] = [
    { name: 'afterScenarioExecution', subscribed: false },
    { name: 'afterScenarioExecutionExt', subscribed: false },
    { name: 'fileContent', subscribed: false },
    { name: 'stageStream', subscribed: false },
  ];

  protected workspaces: Workspace[] = [];
  protected workspaceId: string = '';
  protected showModal: boolean = false;
  protected eventResponse: string = '';
  @ViewChild('eventResponseTextarea') eventResponseTextarea!: ElementRef;
  protected isWorkspaceWorking: boolean = false;
  protected subscribed: boolean = false;
  protected keyForRefresh: number = 1;
  protected bigSize: boolean = true;
  protected showWorkspaceId: number = 0;
  protected subscribedId: string = '';

  public setCurrentWorkspace(id: number): void {
    this.showWorkspaceId = id;
    this.workspaceId = this.workspaces[id].id;
    this.workspaceService.setCurrentWorkspaceId(this.workspaceId);
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
    this.workspaces = workspaceIds.map((x) => ({
      id: x,
      bigSize: true,
      events: [
        { name: 'afterScenarioExecution', subscribed: false },
        { name: 'afterScenarioExecutionExt', subscribed: false },
        { name: 'fileContent', subscribed: false },
        { name: 'stageStream', subscribed: false },
      ],
      show: false,
    }));
    console.log(this.workspaces);
    this.workspaceService.createWorkspace(this.workspaces);
  }

  public removeWorkspace(i: string): void {
    this.workspaceService.removeWorkspace(i);
    this.workspaces = this.workspaces.filter((x) => x.id !== i);
    console.log(this.workspaces);
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
    this.events.forEach((x) => {
      if (x.subscribed) {
        this.subscribedId = this.workspaceService.subscribe(x.name);
        this.subscribed = true;
      }
    });
  }
  public unsubscribeEvent(): void {
    this.events.forEach((x) => {
      this.workspaceService.unsubscribe(x.name);
      this.subscribed = false;
      this.subscribedId = '';
    });
  }
}
