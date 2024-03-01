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
export class ModalComponent implements OnChanges, OnDestroy {
  public ngOnChanges(): void {
    console.log(this.key);
    setTimeout(() => {
      this.workspace = window.SE.workspace('modal-workspace');
    }, 1000);
  }

  public ngOnDestroy(): void {
    this.workspace.destroy();
  }

  protected workspace: any = null;
  @Input() key!: number;
  @Input() workspaceId!: string;
  @ContentChild('modalDiv') modalDiv!: ElementRef;
}
