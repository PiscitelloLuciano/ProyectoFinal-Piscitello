import { createActionGroup, props } from '@ngrx/store';
import { IUser } from 'src/app/dashboard/pages/users/models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'set auth user': props<{ payload: IUser | null }>(),
  },
});
