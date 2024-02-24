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
  protected inputValue: string = '';
  protected isWorkspaceWorking: boolean = false;

  public createWorkspace(): void {
    this.workspaceService.createWorkspace(this.inputValue);
    console.log(this.inputValue);
    this.inputValue = '';
    this.isWorkspaceWorking = this.workspaceService.getIsWorking();
  }
}
