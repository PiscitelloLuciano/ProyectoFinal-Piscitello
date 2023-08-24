import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStudent } from '../../models';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  public isAdmin$: Observable<boolean>;
  public displayedColumns = ['id', 'nameSurname', 'dateRegister', 'actions'];
  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  @Input()
  dataSource: IStudent[] = [];

  @Output()
  deleteStudent = new EventEmitter<IStudent>();

  @Output()
  editStudent = new EventEmitter<IStudent>();
}
