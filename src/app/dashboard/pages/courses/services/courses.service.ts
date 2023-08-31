import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { ICourses } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _courses$ = new BehaviorSubject<ICourses[]>([]);
  private courses$ = this._courses$.asObservable();
  constructor(private http: HttpClient) {}

  loadCourses(): void {
    this.http.get<ICourses[]>(environment.baseApiUrl + '/courses').subscribe({
      next: (payload) => {
        this._courses$.next(payload);
      },
    });
  }

  getCourses(): Observable<ICourses[]> {
    return this.courses$;
  }

  getCourseById(id: number): Observable<ICourses> {
    return this.http.get<ICourses>(environment.baseApiUrl + '/courses/' + id);
  }

  getCourseOptions(): Observable<ICourses[]> {
    return this.http.get<ICourses[]>(environment.baseApiUrl + '/courses');
  }

  createCourse(payload: ICourses): void {
    this.http.post(environment.baseApiUrl + '/courses', payload).subscribe({
      next: (arrayActualizado) => {
        this.loadCourses();
      },
    });
  }

  updateCourse(id: number, payload: ICourses): void {
    this.http
      .put(environment.baseApiUrl + '/courses/' + id, payload)
      .subscribe({
        next: (arrayActualizado) => {
          this.loadCourses();
        },
      });
  }

  deleteCourse(id: number): void {
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
        this.http.delete(environment.baseApiUrl + '/courses/' + id).subscribe({
          next: (arrayActualizado) => {
            this.loadCourses();
          },
        });
      }
    });
  }
}
