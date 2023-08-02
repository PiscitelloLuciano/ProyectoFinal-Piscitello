import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { IUser } from '../models';

const USER_DB: Observable<IUser[]> = of([
  {
    id: 1,
    name: 'Benito',
    surname: 'Perez',
    email: 'BPerez3@gmail.com',
    dni: '36021888',
  },
  {
    id: 2,
    name: 'Kira',
    surname: 'Fito',
    email: 'Kfito@gmail.com',
    dni: '40865956',
  },
  {
    id: 3,
    name: 'Pecesito',
    surname: 'Fizz',
    email: 'Fizz@lol.com',
    dni: '45589231',
  },
]);

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<IUser[]>([]);
  private users$ = this._users$.asObservable();
  constructor() {}

  loadUsers(): void {
    USER_DB.subscribe({
      next: (userFromDB) => this._users$.next(userFromDB),
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

  createUser(user: IUser): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([
          ...arrayActual,
          { ...user, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  updateUser(id: number, user: IUser): void {
    this.users$.pipe(take(1)).subscribe({
      next: (v) => {
        this._users$.next(v.map((u) => (u.id === id ? { ...u, ...user } : u)));
      },
    });
  }

  deleteUser(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (v) => {
        this._users$.next(v.filter((u) => u.id !== id));
      },
    });
  }
}
