import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { IUser } from '../dashboard/pages/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loginData } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authUser$ = new BehaviorSubject<IUser | null>(null);

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(payload: loginData): void {
    this.http
      .get<IUser[]>('http://localhost:3000/users', {
        params: {
          email: payload.email || '',
          password: payload.password || '',
        },
      })
      .subscribe({
        next: (response) => {
          if (response.length) {
            this.authUser$.next(response[0]);
            this.router.navigate(['/dashboard']);
          } else {
            this.notifier.showError('Email o contraseña inválido');
            this.authUser$.next(null);
          }
        },
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authUser$.pipe(
      take(1),
      map((user) => (user ? true : false))
    );
  }
}
