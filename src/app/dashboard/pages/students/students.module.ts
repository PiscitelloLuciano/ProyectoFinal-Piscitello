import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { MatTableModule } from '@angular/material/table';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsDialogComponent,
  ],
  imports: [CommonModule, SharedModule, MatTableModule],
})
export class StudentsModule {}
