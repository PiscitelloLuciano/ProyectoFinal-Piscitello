import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { ICourses } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

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

  getCourseById(id: number) {
    return this.courses$.pipe(
      take(1),
      map((courses) => courses.find((u) => u.id === id))
    );
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
    this.http.delete(environment.baseApiUrl + '/courses/' + id).subscribe({
      next: (arrayActualizado) => {
        this.loadCourses();
      },
    });
  }
}
