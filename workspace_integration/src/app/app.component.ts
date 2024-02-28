import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from './services/workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'workspace_integration';
}
