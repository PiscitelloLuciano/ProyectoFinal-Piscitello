import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourses } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  public isAdmin$: Observable<boolean>;
  public displayedColumns = [
    'id',
    'name',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  @Input()
  dataSource: ICourses[] = [];

  @Output()
  deleteCourse = new EventEmitter<ICourses>();

  @Output()
  editCourse = new EventEmitter<ICourses>();
}
