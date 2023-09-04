import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { IInscriptionWithStudentAndCourse } from '../models';
import { IStudent } from '../../students/models';
import { ICourses } from '../../courses/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: IInscriptionWithStudentAndCourse[];
  studentOptions: IStudent[];
  courseOptions: ICourses[];
  error: unknown;
  loadingInscriptions: boolean;
  loadingStudentOptions: boolean;
  loadingCourseOptions: boolean;
}

export const initialState: State = {
  inscriptions: [],
  error: null,
  studentOptions: [],
  courseOptions: [],
  loadingInscriptions: false,
  loadingStudentOptions: false,
  loadingCourseOptions: false,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, (state) => {
    return {
      ...state,
      loadingInscriptions: true,
    };
  }),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: action.data,
      loadingInscriptions: false,
    };
  }),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  //LOAD STUDENT OPTIONS

  on(InscriptionsActions.loadStudentOptions, (state) => {
    return {
      ...state,
      loadingStudentOptions: true,
    };
  }),
  on(InscriptionsActions.loadStudentOptionsSuccess, (state, action) => {
    return {
      ...state,
      studentOptions: action.data,
      loadingStudentOptions: false,
    };
  }),
  on(InscriptionsActions.loadStudentOptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingStudentOptions: false,
    };
  }),

  //LOAD COURSES OPTIONS

  on(InscriptionsActions.loadCourseOptions, (state) => {
    return {
      ...state,
      loadingCourseOptions: true,
    };
  }),
  on(InscriptionsActions.loadCourseOptionsSuccess, (state, action) => {
    return {
      ...state,
      courseOptions: action.data,
      loadingCourseOptions: false,
    };
  }),
  on(InscriptionsActions.loadCourseOptionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingCourseOptions: false,
    };
  }),

  //DELETE INSCRIPTION

  on(InscriptionsActions.deleteInscription, (state) => ({
    ...state,
    loadingInscriptions: true,
  })),

  on(InscriptionsActions.deleteInscriptionSuccess, (state, { id }) => {
    return {
      ...state,
      inscriptions: state.inscriptions.filter(
        (inscription) => inscription.id !== id
      ),
      loadingInscriptions: false,
    };
  }),

  on(InscriptionsActions.deleteInscriptionFailure, (state, { error }) => ({
    ...state,
    error,
    loadingInscriptions: false,
  }))
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});
