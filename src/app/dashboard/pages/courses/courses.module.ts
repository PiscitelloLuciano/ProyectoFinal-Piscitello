import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDialogComponent,
    CoursesTableComponent,
    CoursesDetailComponent,
  ],
  imports: [CommonModule, SharedModule, MatTableModule, CoursesRoutingModule],
})
export class CoursesModule {}
