import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface WorkspaceIdForm {
  readonly ids: FormArray<FormGroup<IdForm>>;
}

export interface IdForm {
  readonly id: FormControl<string | null>;
}
