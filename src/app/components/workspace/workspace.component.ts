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
export class WorkspaceComponent implements OnInit {
  @Input() workspaceId!: string;
  protected workspace!: any;

  constructor(private workspaceService: WorkspaceService) {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.workspace = window.SE?.workspace(this.workspaceId);
      this.workspaceService.addWorkspace(this.workspace);
    }, 1000);
  }
}
