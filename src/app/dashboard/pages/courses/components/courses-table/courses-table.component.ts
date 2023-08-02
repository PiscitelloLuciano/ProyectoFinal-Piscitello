import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourses } from '../../models';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  public displayedColumns = [
    'id',
    'name',
    'description',
    'startDate',
    'endDate',
    'actions',
  ];

  @Input()
  dataSource: ICourses[] = [];

  @Output()
  deleteCourse = new EventEmitter<ICourses>();

  @Output()
  editCourse = new EventEmitter<ICourses>();
}
