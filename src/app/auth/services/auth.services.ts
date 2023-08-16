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

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authUser$ = new BehaviorSubject<IUser | null>(null);
  private _users$ = new BehaviorSubject<IUser[]>([]);

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(payload: loginData): void {
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
            this.authUser$.next(authUser);
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', authUser.token);
          } else {
            this.authUser$.next(null);
            this.notifier.showError('Email o contraseña inválido');
          }
        },
        error: (err) => {
          this.notifier.showError('Ocurrió un error inesperado');
        },
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http
      .get<IUser[]>(environment.baseApiUrl + '/users', {
        params: {
          token: localStorage.getItem('token') || '',
        },
      })
      .pipe(
        map((userResult) => {
          return !!userResult.length;
        })
      );
  }

  loadUsers(): void {
    this.http.get<IUser[]>(environment.baseApiUrl + '/users').subscribe({
      next: (payload) => {
        this._users$.next(payload);
      },
    });
  }

  createUser(payload: userRegister): void {
    const token = generateRandomString(18);
    this.http
      .post(environment.baseApiUrl + '/users', { ...payload, token })
      .subscribe({
        next: (arrayActualizado) => {
          this.loadUsers();
        },
      });
  }
}
