import { Component } from '@angular/core';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from './services/courses.service';
import { ICourses } from './models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  public courses: Observable<ICourses[]>;
  constructor(private matDialog: MatDialog, private serv: CoursesService) {
    this.serv.loadCourses();
    this.courses = this.serv.getCourses();
  }

  onCreateCourse(): void {
    this.matDialog
      .open(CoursesDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.serv.createCourse({
              name: v.name,
              description: v.description,
              startDate: v.startDate,
              endDate: v.endDate,
            });
          }
        },
      });
  }

  onDeleteCourse(course: ICourses): void {
    if (confirm(`¿Está seguro de eliminar a ${course.name}?`) && course.id) {
      this.serv.deleteCourse(course.id);
    }
  }

  onEditCourse(course: ICourses): void {
    this.matDialog
      // ABRO EL MODAL
      .open(CoursesDialogComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (courseUpdated) => {
          if (courseUpdated && course.id) {
            this.serv.updateCourse(course.id, courseUpdated);
          }
        },
      });
  }
}
