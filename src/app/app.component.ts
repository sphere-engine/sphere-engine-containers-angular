import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkspaceService } from './services/workspace.service';

declare global {
  interface Window {
    SE?: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'workspace_integration';
}
