import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClass } from '../../models';

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.scss'],
})
export class ClassTableComponent {
  public displayedColumns = ['id', 'classes', 'description', 'actions'];

  @Input()
  dataSource: IClass[] = [];

  @Output()
  deleteClasses = new EventEmitter<IClass>();

  @Output()
  editClasses = new EventEmitter<IClass>();
}
