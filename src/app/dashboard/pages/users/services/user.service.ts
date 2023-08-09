import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, of, take } from 'rxjs';
import { IUser } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<IUser[]>([]);
  private users$ = this._users$.asObservable();
  constructor(private http: HttpClient) {}

  loadUsers(): void {
    this.http.get<IUser[]>('http://localhost:3000/users').subscribe({
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
    this.http.post('http://localhost:3000/users', payload).subscribe({
      next: (arrayActualizado) => {
        this.loadUsers();
      },
    });
  }

  updateUser(id: number, payload: IUser): void {
    this.http.put('http://localhost:3000/users/' + id, payload).subscribe({
      next: (arrayActualizado) => {
        this.loadUsers();
      },
    });
  }

  deleteUser(id: number): void {
    this.http.delete('http://localhost:3000/users/' + id).subscribe({
      next: (arrayActualizado) => {
        this.loadUsers();
      },
    });
  }
}
