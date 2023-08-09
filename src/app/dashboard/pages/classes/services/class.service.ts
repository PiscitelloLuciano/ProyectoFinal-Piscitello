import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { IClass } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private _classes$ = new BehaviorSubject<IClass[]>([]);
  private classes$ = this._classes$.asObservable();
  constructor(private http: HttpClient) {}

  loadClasses(): void {
    this.http.get<IClass[]>('http://localhost:3000/classes').subscribe({
      next: (payload) => {
        this._classes$.next(payload);
      },
    });
  }

  getClasses(): Observable<IClass[]> {
    return this.classes$;
  }

  getClassesById(id: number) {
    return this.classes$.pipe(
      take(1),
      map((classes) => classes.find((u) => u.id === id))
    );
  }

  createClasses(payload: IClass): void {
    this.http.post('http://localhost:3000/classes', payload).subscribe({
      next: (arrayActualizado) => {
        this.loadClasses();
      },
    });
  }

  updateClasses(id: number, payload: IClass): void {
    this.http.put('http://localhost:3000/classes/' + id, payload).subscribe({
      next: (arrayActualizado) => {
        this.loadClasses();
      },
    });
  }

  deleteClasses(id: number): void {
    this.http.delete('http://localhost:3000/classes/' + id).subscribe({
      next: (arrayActualizado) => {
        this.loadClasses();
      },
    });
  }
}
