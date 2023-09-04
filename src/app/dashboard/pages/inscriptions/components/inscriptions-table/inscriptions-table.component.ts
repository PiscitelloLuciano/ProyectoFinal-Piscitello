import { Component, OnInit } from '@angular/core';
import { IInscriptionWithStudentAndCourse } from '../../models';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { Observable, of } from 'rxjs';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { selectInscriptions } from '../../store/inscriptions.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { InscriptionsService } from '../../services/inscriptions.service';

@Component({
  selector: 'app-inscriptions-table',
  templateUrl: './inscriptions-table.component.html',
  styleUrls: ['./inscriptions-table.component.scss'],
})
export class InscriptionsTableComponent implements OnInit {
  public displayedColumns = ['id', 'student', 'course', 'actions'];
  public isAdmin$: Observable<boolean>;
  public dataTable = new MatTableDataSource<IInscriptionWithStudentAndCourse>();

  constructor(private store: Store, private serv: InscriptionsService) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }
  ngOnInit(): void {
    this.store.select(selectInscriptions).subscribe((inscriptions) => {
      this.dataTable.data = inscriptions;
      console.log(this.dataTable.data);
    });
    this.store.dispatch(InscriptionsActions.loadInscriptions());
  }

  deleteInscription(id: number) {
    this.store.dispatch(InscriptionsActions.deleteInscription({ id }));
  }
}
