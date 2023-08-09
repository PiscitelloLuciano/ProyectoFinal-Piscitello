import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassesComponent } from './classes.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ClassesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
