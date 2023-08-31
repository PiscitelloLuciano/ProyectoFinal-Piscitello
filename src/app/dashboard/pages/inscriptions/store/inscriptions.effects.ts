import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../services/inscriptions.service';
import { StudentService } from '../../students/services/student.service';
import { CoursesService } from '../../courses/services/courses.service';
import { Store } from '@ngrx/store';
@Injectable()
export class InscriptionsEffects {
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() =>
        this.servInscription.getInscriptions().pipe(
          map((data) => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionsActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadStudentOptions),

      concatMap(() =>
        this.servStudent.getStudentOptions().pipe(
          map((data) =>
            InscriptionsActions.loadStudentOptionsSuccess({ data })
          ),
          catchError((error) =>
            of(InscriptionsActions.loadStudentOptionsFailure({ error }))
          )
        )
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadCourseOptions),

      concatMap(() =>
        this.servCourse.getCourseOptions().pipe(
          map((data) => InscriptionsActions.loadCourseOptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionsActions.loadCourseOptionsFailure({ error }))
          )
        )
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),

      concatMap((action) =>
        this.servInscription.createInscription(action.payload).pipe(
          map((data) => InscriptionsActions.createInscriptionSuccess({ data })),
          catchError((error) =>
            of(InscriptionsActions.createInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  createInscriptionSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(InscriptionsActions.createInscriptionSuccess),
        map(() => this.store.dispatch(InscriptionsActions.loadInscriptions()))
      );
    },
    { dispatch: false }
  );

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),

      concatMap((action) =>
        this.servInscription.deleteInscription(action.id).pipe(
          map(() =>
            InscriptionsActions.deleteInscriptionSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(InscriptionsActions.deleteInscriptionFailure({ error }))
          )
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private servInscription: InscriptionsService,
    private servStudent: StudentService,
    private servCourse: CoursesService,
    private store: Store
  ) {}
}
