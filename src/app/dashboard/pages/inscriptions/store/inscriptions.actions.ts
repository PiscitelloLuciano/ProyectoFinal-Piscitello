import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ICreateInscriptionPayload,
  IInscription,
  IInscriptionWithStudentAndCourse,
} from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { IStudent } from '../../students/models';
import { ICourses } from '../../courses/models';
import { Observable } from 'rxjs';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{
      data: IInscriptionWithStudentAndCourse[];
    }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Student Options': emptyProps(),
    'Load Student Options Success': props<{ data: IStudent[] }>(),
    'Load Student Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: ICourses[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: ICreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: IInscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Inscription': props<{ id: number }>(),
    'Delete Inscription Success': props<{ id: number }>(),
    'Delete Inscription Failure': props<{ error: HttpErrorResponse }>(),
  },
});
