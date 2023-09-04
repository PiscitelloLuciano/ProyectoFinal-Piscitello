import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { IUser } from '../../dashboard/pages/users/models';
import { NotifierService } from '../../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loginData } from '../models';
import { userRegister } from '../pages/register/models';
import { environment } from 'src/environments/environments';
import { generateRandomString } from 'src/app/core/utils/helpers';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { UsersComponent } from 'src/app/dashboard/pages/users/users.component';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _users$ = new BehaviorSubject<IUser[]>([]);

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private http: HttpClient,
    private store: Store
  ) {}

  public login(payload: loginData): void {
    this.http
      .get<IUser[]>(environment.baseApiUrl + '/users', {
        params: {
          email: payload.email || '',
          password: payload.password || '',
        },
      })
      .subscribe({
        next: (response) => {
          if (response.length) {
            const authUser = response[0];
            this.store.dispatch(
              AuthActions.setAuthUser({
                payload: authUser,
              })
            );
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', authUser.token);
          } else {
            this.notifier.showError('Email o contraseña inválido');
          }
        },
        error: (err) => {
          this.notifier.showError('Ocurrió un error inesperado');
        },
      });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.http
      .get<IUser[]>(environment.baseApiUrl + '/users', {
        params: {
          token: localStorage.getItem('token') || '',
        },
      })
      .pipe(
        map((userResult) => {
          if (UsersComponent.length) {
            const authUser = userResult[0];
            this.store.dispatch(
              AuthActions.setAuthUser({
                payload: authUser,
              })
            );
          }
          return !!userResult.length;
        })
      );
  }

  public loadUsers(): void {
    this.http.get<IUser[]>(environment.baseApiUrl + '/users').subscribe({
      next: (payload) => {
        this._users$.next(payload);
      },
    });
  }

  public createUser(payload: userRegister): void {
    const token = generateRandomString(18);
    this.http
      .post(environment.baseApiUrl + '/users', { ...payload, token })
      .subscribe({
        next: (arrayActualizado) => {
          this.loadUsers();
          this.notifier.showSuccess('Usuario registrado con exito');
        },
      });
  }

  public logOut(): void {
    this.store.dispatch(
      AuthActions.setAuthUser({
        payload: null,
      })
    );
  }
}
