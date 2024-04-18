import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  public ngOnDestroy(): void {
    if (this.workspace) {
      this.workspace.destroy();
    }
  }

  public setCurrentWorkspace(ws: any): void {
    this.workspace = ws;
    console.log(ws);
  }

  protected workspace: any = null;
  @Input() key!: number;
  @Input() workspaceId!: string;
  @ContentChild('modalDiv') modalDiv!: ElementRef;
}
