import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { Observable } from 'rxjs';
import { IInscription, IInscriptionWithStudentAndCourse } from './models';
import {
  selectInscriptions,
  selectInscriptionsState,
} from './store/inscriptions.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss'],
})
export class InscriptionsComponent implements OnInit {
  inscriptions$: Observable<IInscriptionWithStudentAndCourse[]>;
  constructor(private store: Store, private matDialog: MatDialog) {
    this.inscriptions$ = this.store.select(selectInscriptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
  }

  onAdd(): void {
    this.matDialog.open(InscriptionDialogComponent);
  }

  onDeleteInscription(id: number) {
    return this.store.dispatch(InscriptionsActions.deleteInscription({ id }));
  }
}
