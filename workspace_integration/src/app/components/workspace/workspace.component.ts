import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';

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
        this.key += 1;
      },
      error: (err) => console.log('error: ' + err),
    });
  }

  protected key: number = 1;
  protected workspaceId: string = '';
}
