import { Component } from '@angular/core';
import { ICourses } from '../../models';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss'],
})
export class CoursesDetailComponent {
  public course$: ICourses | undefined;

  constructor(
    private serv: CoursesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadCourse();
  }

  loadCourse(): void {
    this.serv
      .getCourseById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
          this.course$ = course;
        },
      });
  }
}
