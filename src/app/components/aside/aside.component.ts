import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';

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

    this.workspaceService.eventResponse$.subscribe({
      next: (value) => {
        this.eventResponse = value;
      },
    });
  }

  protected events: string[] = [
    'afterScenarioExecution',
    'afterScenarioExecutionExt',
    'fileContent',
    'stageStream',
  ];

  protected workspaceIds: string[] = [];
  protected workspaceId: string = '';
  protected showModal: boolean = false;
  protected event: string = '';
  protected eventResponse: string = '';
  protected isWorkspaceWorking: boolean = false;
  protected subscribed: boolean = false;
  protected keyForRefresh: number = 1;
  protected showWorkspace: boolean = false;
  protected bigSize: boolean = true;
  protected showWorkspaceId: number = 0;
  protected subscribedId: string = '';

  public setCurrentWorkspace(id: number): void {
    this.showWorkspaceId = id;
    this.workspaceId = this.workspaceIds[id];
    this.workspaceService.setCurrentWorkspaceId(this.workspaceId);
  }

  public resize(): void {
    this.bigSize = !this.bigSize;
  }

  public displayModal(): void {
    this.showModal = !this.showModal;
    this.keyForRefresh++;
  }

  public createWorkspace(workspaceIds: string[]): void {
    this.showWorkspaceId = 0;
    this.workspaceId = workspaceIds[this.showWorkspaceId];
    this.workspaceIds = workspaceIds;
    this.workspaceService.createWorkspace(this.workspaceIds);
    this.showWorkspace = true;
  }

  public removeWorkspace(): void {
    this.workspaceId = '';
    this.workspaceIds = [];
    this.workspaceService.removeWorkspace();
  }
  public destroyWorkspace(): void {
    this.showWorkspace = false;
  }
  public renderWorkspace(): void {
    this.showWorkspace = true;
    this.keyForRefresh++;
  }
  public subscribeEvent(): void {
    this.subscribedId = this.workspaceService.subscribe(this.event);
    this.subscribed = true;
  }
  public unsubscribeEvent(): void {
    this.workspaceService.unsubscribe(this.event);
    this.subscribed = false;
    this.subscribedId = '';
  }
}
