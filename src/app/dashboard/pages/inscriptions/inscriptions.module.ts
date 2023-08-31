import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscriptionsTableComponent } from './components/inscriptions-table/inscriptions-table.component';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';

@NgModule({
  declarations: [InscriptionsComponent, InscriptionsTableComponent, InscriptionDialogComponent],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects]),
  ],
})
export class InscriptionsModule {}
