import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { IStudent } from '../../../students/models';
import { Observable } from 'rxjs';
import {
  selectCourseOptions,
  selectStudentOptions,
} from '../../store/inscriptions.selectors';
import { ICourses } from '../../../courses/models';
import { MatDialogRef } from '@angular/material/dialog';
import { IInscription } from '../../models';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrls: ['./inscription-dialog.component.scss'],
})
export class InscriptionDialogComponent implements OnInit {
  studentOptions$: Observable<IStudent[]>;
  courseOptions$: Observable<ICourses[]>;

  studentIdControl = new FormControl(null, Validators.required);
  courseIdControl = new FormControl(null, Validators.required);

  inscriptionForm = new FormGroup({
    studentId: this.studentIdControl,
    courseId: this.courseIdControl,
  });

  constructor(
    private store: Store,
    private matDialogRef: MatDialogRef<InscriptionDialogComponent>
  ) {
    this.studentOptions$ = this.store.select(selectStudentOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionsActions.loadStudentOptions());
    this.store.dispatch(InscriptionsActions.loadCourseOptions());
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        InscriptionsActions.createInscription({
          payload: this.inscriptionForm.getRawValue(),
        })
      );
      this.matDialogRef.close();
    }
  }
}
