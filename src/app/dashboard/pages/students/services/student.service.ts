import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { IStudent } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _students$ = new BehaviorSubject<IStudent[]>([]);
  private students$ = this._students$.asObservable();
  constructor(private http: HttpClient) {}

  loadStudents(): void {
    this.http.get<IStudent[]>(environment.baseApiUrl + '/students').subscribe({
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
    this.http.post(environment.baseApiUrl + '/students', payload).subscribe({
      next: (arrayActualizado) => {
        this.loadStudents();
      },
    });
  }

  updateStudent(id: number, payload: IStudent): void {
    this.http
      .put(environment.baseApiUrl + '/students/' + id, payload)
      .subscribe({
        next: (arrayActualizado) => {
          this.loadStudents();
        },
      });
  }

  deleteStudent(id: number): void {
    this.http.delete(environment.baseApiUrl + '/students/' + id).subscribe({
      next: (arrayActualizado) => {
        this.loadStudents();
      },
    });
  }
}
