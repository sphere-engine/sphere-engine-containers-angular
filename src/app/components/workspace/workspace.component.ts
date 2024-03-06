import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
export class WorkspaceComponent {
  @Input() workspaceId!: string;
}
