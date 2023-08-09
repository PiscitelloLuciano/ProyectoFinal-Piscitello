import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { IUser } from './models';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: Observable<IUser[]>;
  constructor(private matDialog: MatDialog, private serv: UserService) {
    this.serv.loadUsers();
    this.users = this.serv.getUsers();
  }

  onCreateUser(): void {
    this.matDialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.serv.createUser({
              name: v.name,
              surname: v.surname,
              email: v.email,
              password: v.password,
            });
          }
        },
      });
  }

  onDeleteUser(user: IUser): void {
    if (confirm(`¿Está seguro de eliminar a ${user.name}?`) && user.id) {
      this.serv.deleteUser(user.id);
    }
  }

  onEditUser(user: IUser): void {
    this.matDialog
      // ABRO EL MODAL
      .open(UsersDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          if (userUpdated && user.id) {
            this.serv.updateUser(user.id, userUpdated);
          }
        },
      });
  }
}
