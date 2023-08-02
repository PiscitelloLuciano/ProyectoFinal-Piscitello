import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClass } from '../../models';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss'],
})
export class ClassDialogComponent {
  nameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  descriptionControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  classesForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
  });

  constructor(
    private dialogRef: MatDialogRef<ClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IClass
  ) {
    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);
    }
  }

  onSubmit(): void {
    if (this.classesForm.invalid) {
      this.classesForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.classesForm.value);
    }
  }
}
