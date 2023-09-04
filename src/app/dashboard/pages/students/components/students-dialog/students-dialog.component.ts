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
    Validators.minLength(8),
  ]);
  descriptionControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(15),
    Validators.maxLength(256),
  ]);
  birthAgeControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  dniControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(1000000),
    Validators.max(99999999),
  ]);

  studentForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    dateRegister: this.dateRegisterControl,
    description: this.descriptionControl,
    birthAge: this.birthAgeControl,
    dni: this.dniControl,
  });

  constructor(
    private dialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: IStudent
  ) {
    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.dateRegisterControl.setValue(this.data.dateRegister);
      this.descriptionControl.setValue(this.data.description);
      this.birthAgeControl.setValue(this.data.birthAge);
      this.dniControl.setValue(this.data.dni);
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
