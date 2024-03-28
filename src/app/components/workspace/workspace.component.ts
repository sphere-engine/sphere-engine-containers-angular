import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent {
  @Input() workspaceId!: string;
  protected workspace!: any;
  protected notLoaded: boolean = true;

  constructor(private workspaceService: WorkspaceService) {}

  public load(): void {
    this.workspace = window.SE?.workspace(this.workspaceId);
    this.workspaceService.addWorkspace(this.workspace);
    this.notLoaded = false;
  }
}
