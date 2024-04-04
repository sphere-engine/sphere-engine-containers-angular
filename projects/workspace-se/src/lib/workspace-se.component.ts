import { Component } from '@angular/core';

declare global {
  interface Window {
    SE?: any;
  }
}

@Component({
  selector: 'lib-workspace-se',
  templateUrl: './workspace-se.component.html',
  styleUrls: ['./workspace-se.component.scss'],
})
export class WorkspaceSeComponent {
  protected workspaceId: string = '';
  protected loaded: boolean = false;
  protected workspace: any;
  public load(): void {
    this.loaded = true;
    setTimeout(() => {
      this.workspace = window.SE.workspace(this.workspaceId);
    }, 1000);
  }
}
