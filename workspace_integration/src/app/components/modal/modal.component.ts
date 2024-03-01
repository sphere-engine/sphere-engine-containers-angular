import {
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  public ngOnChanges(): void {
    console.log(this.key);
    setTimeout(() => {
      const element = document.getElementById('modal-workspace');
      element?.setAttribute('data-workspace', this.workspaceId);
      this.workspace = window.SE.workspace('modal-workspace');
      window.SE.create(0, document.getElementById('modal-workspace'));
    }, 1000);
  }

  protected workspace = null;
  @Input() key!: number;
  @Input() workspaceId!: string;
  @ContentChild('modalDiv') modalDiv!: ElementRef;
}
