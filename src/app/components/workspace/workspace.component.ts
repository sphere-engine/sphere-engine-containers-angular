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
export class WorkspaceComponent implements OnInit {
  public constructor(private workspaceService: WorkspaceService) {}
  public ngOnInit(): void {
    this.workspaceService.workspaceId$.subscribe({
      next: (value) => {
        this.workspaceId = value;
      },
    });
  }

  // nastepnym razem tego komponentu nie powinno byc, tylko zrobic to w jakims main
  protected workspaceId: string = '';
}
