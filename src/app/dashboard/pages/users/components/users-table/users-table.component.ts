import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../models';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  displayedColumns: string[] = [
    'id',
    'name surname',
    'email',
    'dni',
    'actions',
  ];

  @Input()
  dataSource: IUser[] = [];

  @Output()
  deleteUser = new EventEmitter<IUser>();

  @Output()
  editUser = new EventEmitter<IUser>();
}
