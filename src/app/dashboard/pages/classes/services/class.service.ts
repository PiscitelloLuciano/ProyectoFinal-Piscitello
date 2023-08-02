import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { IClass } from '../models';

const CLASS_DB: Observable<IClass[]> = of([
  {
    id: 1,
    name: 'RXJS',
    description: 'Pico más alto de dificultad',
  },
  {
    id: 2,
    name: 'Routing',
    description: 'Conecta tu aplicación por medio de URLs',
  },
  {
    id: 3,
    name: 'Form',
    description: 'Formularios Reactivos con Angular',
  },
]);

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private _classes$ = new BehaviorSubject<IClass[]>([]);
  private classes$ = this._classes$.asObservable();
  constructor() {}

  loadClasses(): void {
    CLASS_DB.subscribe({
      next: (classesFromDB) => this._classes$.next(classesFromDB),
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

  createClasses(classes: IClass): void {
    this.classes$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._classes$.next([
          ...arrayActual,
          { ...classes, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  updateClasses(id: number, classes: IClass): void {
    this.classes$.pipe(take(1)).subscribe({
      next: (v) => {
        this._classes$.next(
          v.map((u) => (u.id === id ? { ...u, ...classes } : u))
        );
      },
    });
  }

  deleteClasses(id: number): void {
    this._classes$.pipe(take(1)).subscribe({
      next: (v) => {
        this._classes$.next(v.filter((u) => u.id !== id));
      },
    });
  }
}
