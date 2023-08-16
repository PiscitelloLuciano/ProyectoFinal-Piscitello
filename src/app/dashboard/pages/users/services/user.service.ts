import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, of, take } from 'rxjs';
import { IUser } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generateRandomString } from 'src/app/core/utils/helpers';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<IUser[]>([]);
  private users$ = this._users$.asObservable();
  constructor(private http: HttpClient) {}

  loadUsers(): void {
    this.http
      .get<IUser[]>(environment.baseApiUrl + '/users', {
        headers: new HttpHeaders({
          token: '12345678910',
        }),
      })
      .subscribe({
        next: (payload) => {
          this._users$.next(payload);
        },
      });
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      take(1),
      map((users) => users.find((u) => u.id === id))
    );
  }

  createUser(payload: IUser): void {
    const token = generateRandomString(18);
    this.http
      .post(environment.baseApiUrl + '/users', { ...payload, token })
      .subscribe({
        next: (arrayActualizado) => {
          this.loadUsers();
        },
      });
  }

  updateUser(id: number, payload: IUser): void {
    const token = localStorage.getItem('token') || '';
    this.http
      .put(environment.baseApiUrl + '/users/' + id, { ...payload, token })
      .subscribe({
        next: (arrayActualizado) => {
          this.loadUsers();
        },
      });
  }

  deleteUser(id: number): void {
    this.http.delete(environment.baseApiUrl + '/users/' + id).subscribe({
      next: (arrayActualizado) => {
        this.loadUsers();
      },
    });
  }
}
