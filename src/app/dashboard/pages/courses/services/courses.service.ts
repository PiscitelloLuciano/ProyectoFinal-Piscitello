import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { ICourses } from '../models';

const COURSES_DB: Observable<ICourses[]> = of([
  {
    id: 1,
    name: 'Angular',
    description: 'Curso de Angular',
    startDate: '2023/09/01',
    endDate: '2023/11/01',
  },
  {
    id: 2,
    name: 'React',
    description: 'Curso de React',
    startDate: '2023/09/01',
    endDate: '2023/11/01',
  },
]);

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _courses$ = new BehaviorSubject<ICourses[]>([]);
  private courses$ = this._courses$.asObservable();
  constructor() {}

  loadCourses(): void {
    COURSES_DB.subscribe({
      next: (courseFromDB) => this._courses$.next(courseFromDB),
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

  createCourse(course: ICourses): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next([
          ...arrayActual,
          { ...course, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  updateCourse(id: number, course: ICourses): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (v) => {
        this._courses$.next(
          v.map((u) => (u.id === id ? { ...u, ...course } : u))
        );
      },
    });
  }

  deleteCourse(id: number): void {
    this._courses$.pipe(take(1)).subscribe({
      next: (v) => {
        this._courses$.next(v.filter((u) => u.id !== id));
      },
    });
  }
}
