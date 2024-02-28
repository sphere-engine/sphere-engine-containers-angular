import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { tap } from 'rxjs';

declare global {
  interface Window {
    SE?: any;
  }
}

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements AfterContentInit {
  public constructor(private workspaceService: WorkspaceService) {}
  @Input() workspaceId!: string;
  public ngAfterContentInit(): void {
    window.SE.ready(() => {
      this.workspace = window.SE.workspace('123');
      this.key += 1;
    });
  }

  protected key: number = 1;
  protected workspace = null;
}
