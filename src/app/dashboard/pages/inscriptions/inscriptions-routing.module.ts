import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InscriptionsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class InscriptionsRoutingModule {}
