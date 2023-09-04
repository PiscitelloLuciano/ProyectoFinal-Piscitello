import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourses } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  public isAdmin$: Observable<boolean>;
  public displayedColumns = ['id', 'name', 'startDate', 'endDate', 'actions'];
  public courses: ICourses[] = [];
  public dateInit: string = '';
  public dateEnd: string = '';

  constructor(private store: Store, private serv: CoursesService) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.serv.loadCourses();
  }

  formatearFecha(fecha: Date): string {
    if (!fecha) return '';
    const fechaSinZonaHoraria = new Date(fecha + 'T00:00:00Z');
    return fechaSinZonaHoraria.toLocaleDateString();
  }

  @Input()
  dataSource: ICourses[] = [];

  @Output()
  deleteCourse = new EventEmitter<ICourses>();

  @Output()
  editCourse = new EventEmitter<ICourses>();
}
