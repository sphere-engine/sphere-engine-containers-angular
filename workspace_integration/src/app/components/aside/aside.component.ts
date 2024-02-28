import { Component } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  public constructor(private workspaceService: WorkspaceService) {}

  protected events: string[] = [
    'afterScenarioExecution',
    'afterScenarioExecutionExt',
    'fileContent',
    'stageStream',
  ];

  protected event: string = '';
  protected eventResponse: string = '';
  protected projectId: string = ''; //d6036e3f2c4d4829b5be3cb3b36ce39e
  protected accessToken: string = ''; //77f3a4eb6cb94f0381978bdc25f4d6e7
  protected isWorkspaceWorking: boolean = false;
  protected tokenErrorMsg: string = '';

  public saveToken(): void {
    this.workspaceService.saveToken(this.accessToken).subscribe({
      next: (value) => {
        if (value) {
          this.tokenErrorMsg = 'Token accepted';
        } else {
          this.tokenErrorMsg = 'Token not accepted';
        }
      },
      error: () => {
        this.tokenErrorMsg = 'Token not accepted';
      },
    });
  }

  public createWorkspace(): void {
    this.workspaceService.createWorkspace(this.projectId);
    this.isWorkspaceWorking = this.workspaceService.getIsWorking();
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
