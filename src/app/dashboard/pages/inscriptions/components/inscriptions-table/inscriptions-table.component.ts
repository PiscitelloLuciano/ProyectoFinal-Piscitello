import { Component, Input } from '@angular/core';
import { IInscriptionWithStudentAndCourse } from '../../models';
import { Store } from '@ngrx/store';
import { IUser } from '../../../users/models';
import {
  selectAuthUser,
  selectIsAdmin,
} from 'src/app/store/auth/auth.selector';
import { Observable } from 'rxjs';
import { InscriptionsActions } from '../../store/inscriptions.actions';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.scss'],
})
export class InscriptionsTableComponent {
  public displayedColumns = ['id', 'student', 'course', 'actions'];
  public user$: Observable<IUser | null>;
  public isAdmin$: Observable<boolean>;
  @Input()
  dataSource: IInscriptionWithStudentAndCourse[] = [];

  constructor(private store: Store) {
    this.user$ = this.store.select(selectAuthUser);
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  deleteInscription(id: number) {
    this.store.dispatch(InscriptionsActions.deleteInscription({ id }));
  }
}
