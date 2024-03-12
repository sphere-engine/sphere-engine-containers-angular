import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  @Input() workspaceId!: string;

  public ngOnInit(): void {
    setTimeout(() => {
      window.SE?.workspace(this.workspaceId);
    }, 1000);
  }
}
