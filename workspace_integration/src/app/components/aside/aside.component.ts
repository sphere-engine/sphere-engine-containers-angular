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
  }

  protected events: string[] = [
    'afterScenarioExecution',
    'afterScenarioExecutionExt',
    'fileContent',
    'stageStream',
  ];

  protected event: string = '';
  protected eventResponse: string = '';
  protected projectId: string = 'd6036e3f2c4d4829b5be3cb3b36ce39e'; //d6036e3f2c4d4829b5be3cb3b36ce39e
  protected accessToken: string = '77f3a4eb6cb94f0381978bdc25f4d6e7'; //77f3a4eb6cb94f0381978bdc25f4d6e7
  protected isWorkspaceWorking: boolean = false;
  protected tokenErrorMsg: string = '';
  protected isToken: boolean = false;

  public saveToken(): void {
    this.workspaceService.saveToken(this.accessToken).subscribe({
      next: (value) => {
        if (value) {
          this.tokenErrorMsg = 'Token accepted';
          this.isToken = true;
        } else {
          this.tokenErrorMsg = 'Token not accepted';
          this.isToken = false;
        }
      },
      error: () => {
        this.tokenErrorMsg = 'Token not accepted';
        this.isToken = false;
      },
    });
  }

  public createWorkspace(): void {
    this.workspaceService.createWorkspace(this.projectId);
  }

  public removeWorkspace(): void {
    this.workspaceService.removeWorkspace();
  }
  public destroyWorkspace(): void {
    this.workspaceService.destroyWorkspace();
  }
  public renderWorkspace(): void {
    this.workspaceService.renderWorkspace();
  }
}
