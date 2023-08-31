import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { IStudent } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _students$ = new BehaviorSubject<IStudent[]>([]);
  public students$ = this._students$.asObservable();
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

  public getStudentOptions(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(environment.baseApiUrl + '/students');
  }

  getStudentById(id: number): Observable<IStudent> {
    return this.http.get<IStudent>(environment.baseApiUrl + '/students/' + id);
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
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se borrará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado', `Ha sido eliminado con exito`, 'success');
        this.http.delete(environment.baseApiUrl + '/students/' + id).subscribe({
          next: (arrayActualizado) => {
            this.loadStudents();
          },
        });
      }
    });
  }
}
