import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { MatTableModule } from '@angular/material/table';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDetailComponent } from './pages/students-detail/students-detail.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsDialogComponent,
    StudentsDetailComponent,
  ],
  imports: [CommonModule, SharedModule, MatTableModule, StudentsRoutingModule],
})
export class StudentsModule {}
