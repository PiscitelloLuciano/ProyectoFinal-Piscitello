import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { ClassTableComponent } from './components/class-table/class-table.component';
import { ClassDialogComponent } from './components/class-dialog/class-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ClassesComponent, ClassTableComponent, ClassDialogComponent],
  imports: [CommonModule, SharedModule, MatTableModule],
})
export class ClassesModule {}
