import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICourses } from '../../models';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent {
  nameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  descriptionControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(15),
  ]);
  startDateControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  endDateControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);

  courseForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
  });

  constructor(
    private dialogRef: MatDialogRef<CoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: ICourses
  ) {
    if (this.data) {
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);
      this.startDateControl.setValue(this.data.startDate);
      this.endDateControl.setValue(this.data.endDate);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
