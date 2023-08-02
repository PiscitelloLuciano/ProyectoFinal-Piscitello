import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDialogComponent,
    CoursesTableComponent,
  ],
  imports: [CommonModule, SharedModule, MatTableModule],
})
export class CoursesModule {}
