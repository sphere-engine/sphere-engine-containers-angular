import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IdForm, WorkspaceIdForm } from 'src/app/models/workspaceIdForm.model';

@Component({
  selector: 'app-workspace-form',
  templateUrl: './workspace-form.component.html',
  styleUrls: ['./workspace-form.component.scss'],
})
export class WorkspaceFormComponent {
  protected workspaceIds: string[] = [];

  protected workspaceIdForm: FormGroup<WorkspaceIdForm> =
    new FormGroup<WorkspaceIdForm>({
      ids: new FormArray<FormGroup<IdForm>>([]),
    });

  public addId(): FormGroup<IdForm> {
    const newId: FormGroup<IdForm> = new FormGroup<IdForm>({
      id: new FormControl<string>('', [Validators.required]),
    });
    this.workspaceIdForm.controls.ids.push(newId);

    return newId;
  }

  public removeId(i: number): void {
    this.workspaceIdForm.controls.ids.removeAt(i);
  }

  protected getIds(): FormArray<FormGroup<IdForm>> {
    return this.workspaceIdForm.controls.ids as FormArray<FormGroup<IdForm>>;
  }

  public createWorkspaces(): void {
    this.workspaceIds = this.getIds().value.map((t: any) => t.id);
    console.log(this.workspaceIds);
  }
}
