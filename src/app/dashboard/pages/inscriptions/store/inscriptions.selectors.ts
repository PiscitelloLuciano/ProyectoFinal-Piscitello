import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState =
  createFeatureSelector<fromInscriptions.State>(
    fromInscriptions.inscriptionsFeatureKey
  );

export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.inscriptions
);

export const selectStudentOptions = createSelector(
  selectInscriptionsState,
  (state) => state.studentOptions
);

export const selectCourseOptions = createSelector(
  selectInscriptionsState,
  (state) => state.courseOptions
);
