import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IStudent } from '../../models';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss'],
})
export class StudentsDialogComponent {
  nameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  surnameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  dateRegisterControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    dateRegister: this.dateRegisterControl,
  });

  constructor(
    private dialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IStudent
  ) {
    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.dateRegisterControl.setValue(this.data.dateRegister);
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
