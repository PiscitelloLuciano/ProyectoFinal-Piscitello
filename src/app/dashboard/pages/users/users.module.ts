import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { NombreApellidoPipe } from './users-table/pipes/nombre-apellido.pipe';

@NgModule({
  declarations: [UsersComponent, UsersTableComponent, UsersDialogComponent, NombreApellidoPipe],
  imports: [CommonModule, SharedModule, MatTableModule],
  exports: [UsersComponent],
})
export class UsersModule {}
