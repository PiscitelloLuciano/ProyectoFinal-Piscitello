import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { IStudent } from '../models';

const STUDENTS_DB: Observable<IStudent[]> = of([
  {
    id: 1,
    name: 'Jose',
    surname: 'Fernandez',
    dateRegister: '30 de Noviembre',
  },
  {
    id: 2,
    name: 'Kira',
    surname: 'Fito',
    dateRegister: '1 de Marzo',
  },
  {
    id: 3,
    name: 'Pecesito',
    surname: 'Fizz',
    dateRegister: '16 de Febrero',
  },
]);

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _students$ = new BehaviorSubject<IStudent[]>([]);
  private students$ = this._students$.asObservable();
  constructor() {}

  loadStudents(): void {
    STUDENTS_DB.subscribe({
      next: (studentFromDB) => this._students$.next(studentFromDB),
    });
  }

  getStudents(): Observable<IStudent[]> {
    return this.students$;
  }

  getStudentById(id: number) {
    return this.students$.pipe(
      take(1),
      map((students) => students.find((u) => u.id === id))
    );
  }

  createStudent(student: IStudent): void {
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._students$.next([
          ...arrayActual,
          { ...student, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  updateStudent(id: number, student: IStudent): void {
    this.students$.pipe(take(1)).subscribe({
      next: (v) => {
        this._students$.next(
          v.map((u) => (u.id === id ? { ...u, ...student } : u))
        );
      },
    });
  }

  deleteStudent(id: number): void {
    this._students$.pipe(take(1)).subscribe({
      next: (v) => {
        this._students$.next(v.filter((u) => u.id !== id));
      },
    });
  }
}
