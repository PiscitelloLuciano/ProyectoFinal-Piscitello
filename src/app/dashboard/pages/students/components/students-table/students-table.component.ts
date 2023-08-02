import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudent } from '../../models';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  public displayedColumns = ['id', 'nameSurname', 'dateRegister', 'actions'];

  @Input()
  dataSource: IStudent[] = [];

  @Output()
  deleteStudent = new EventEmitter<IStudent>();

  @Output()
  editStudent = new EventEmitter<IStudent>();
}
