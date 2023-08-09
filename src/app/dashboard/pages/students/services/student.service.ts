import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { IStudent } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _students$ = new BehaviorSubject<IStudent[]>([]);
  private students$ = this._students$.asObservable();
  constructor(private http: HttpClient) {}

  loadStudents(): void {
    this.http.get<IStudent[]>('http://localhost:3000/students').subscribe({
      next: (arrayActualizado) => {
        this._students$.next(arrayActualizado);
      },
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

  createStudent(payload: IStudent): void {
    this.http.post('http://localhost:3000/students', payload).subscribe({
      next: (arrayActualizado) => {
        this.loadStudents();
      },
    });
  }

  updateStudent(id: number, payload: IStudent): void {
    this.http.put('http://localhost:3000/students/' + id, payload).subscribe({
      next: (arrayActualizado) => {
        this.loadStudents();
      },
    });
  }

  deleteStudent(id: number): void {
    this.http.delete('http://localhost:3000/students/' + id).subscribe({
      next: (arrayActualizado) => {
        this.loadStudents();
      },
    });
  }
}
