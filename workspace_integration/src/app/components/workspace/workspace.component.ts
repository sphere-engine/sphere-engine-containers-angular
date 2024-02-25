import { Component, OnInit } from '@angular/core';
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
    this.workspaceService.workspaceId$
      .pipe(
        tap((value) => {
          this.workspaceId = value;
          this.refreshed = true;
          this.key += 1;
        })
      )
      .subscribe({
        next: (value) => {
          window.SE?.ready(() => {
            console.log(value);
            this.workspace = window.SE?.workspace('123');
          });
        },
        error: (err) => console.log('error: ' + err),
      });
  }

  protected refreshed: boolean = false;
  protected key: number = 1;
  protected workspaceId: string = '';
  protected workspace = null;
}
