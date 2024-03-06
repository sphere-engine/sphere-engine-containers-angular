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

  protected workspaceId: string = '';
  protected showModal: boolean = false;
  protected event: string = '';
  protected eventResponse: string = '';
  protected isWorkspaceWorking: boolean = false;
  protected tokenErrorMsg: string = '';
  protected subscribed: boolean = false;
  protected keyForRefresh: number = 1;
  protected showWorkspace: boolean = false;

  public displayModal(): void {
    this.showModal = !this.showModal;
    this.keyForRefresh++;
  }

  public createWorkspace(): void {
    this.workspaceService.createWorkspace(this.workspaceId);
    this.showWorkspace = true;
  }

  public removeWorkspace(): void {
    this.workspaceService.removeWorkspace();
  }
  public destroyWorkspace(): void {
    this.showWorkspace = false;
  }
  public renderWorkspace(): void {
    this.showWorkspace = true;
    this.keyForRefresh++;
    window.SE.workspace('seco-workspace');
  }
  public subscribeEvent(): void {
    this.workspaceService.subscribe(this.event);
    this.subscribed = true;
  }
  public unsubscribeEvent(): void {
    this.workspaceService.unsubscribe(this.event);
    this.subscribed = false;
  }
}
