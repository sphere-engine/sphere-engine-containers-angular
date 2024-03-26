import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

    // this.workspaceService.eventResponse$.subscribe({
    //   next: (value) => {
    //     this.eventResponse = value;
    //   },
    // });
  }

  protected events: { name: string; subscribed: boolean }[] = [
    { name: 'afterScenarioExecution', subscribed: false },
    { name: 'afterScenarioExecutionExt', subscribed: false },
    { name: 'fileContent', subscribed: false },
    { name: 'stageStream', subscribed: false },
  ];

  protected workspaceIds: string[] = [];
  protected workspaceId: string = '';
  protected showModal: boolean = false;
  protected eventResponse: string = '';
  @ViewChild('eventResponseTextarea') eventResponseTextarea!: ElementRef;
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
    this.workspaceIds = workspaceIds;
    this.workspaceService.createWorkspace(this.workspaceIds);
    this.showWorkspace = true;
  }

  public removeWorkspace(): void {
    this.events.forEach((x) => {
      x.subscribed = false;
    });
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
    this.events.forEach((x) => {
      if (x.subscribed) {
        this.subscribedId = this.workspaceService.subscribe(x.name);
        this.subscribed = true;
      }
    });
  }
  public unsubscribeEvent(): void {
    this.events.forEach((x) => {
      if (x.subscribed) {
        this.workspaceService.unsubscribe(x.name);
        this.subscribed = false;
        this.subscribedId = '';
      }
    });
  }
}
