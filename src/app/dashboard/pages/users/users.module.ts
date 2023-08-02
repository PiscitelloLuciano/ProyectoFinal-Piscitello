import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NombreApellidoPipe } from '../../../core/pipes/nombre-apellido.pipe';
import { UsersRoutingModule } from './users-routing.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersDialogComponent,
    NombreApellidoPipe,
  ],
  imports: [CommonModule, SharedModule, MatTableModule, UsersRoutingModule],
  exports: [UsersComponent],
})
export class UsersModule {}
