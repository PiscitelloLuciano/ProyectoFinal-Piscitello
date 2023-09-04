import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IInscriptionWithStudentAndCourse } from './models';
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
export class InscriptionsComponent {
  constructor(private store: Store, private matDialog: MatDialog) {}

  onAdd(): void {
    this.matDialog.open(InscriptionDialogComponent);
  }
}
