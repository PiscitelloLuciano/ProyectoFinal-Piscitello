import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { IUser } from './models/model';

const ELEMENT_DATA: IUser[] = [
  {
    id: 1,
    name: 'Benito',
    surname: 'Perez',
    email: 'BPerez3@gmail.com',
    dni: '36021888',
  },
  {
    id: 2,
    name: 'Kira',
    surname: 'Fito',
    email: 'Kfito@gmail.com',
    dni: '40865956',
  },
  {
    id: 3,
    name: 'Pecesito',
    surname: 'Fizz',
    email: 'Fizz@lol.com',
    dni: '45589231',
  },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: IUser[] = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {}

  onCreateUser(): void {
    this.matDialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (v) {
            this.users = [
              ...this.users,
              {
                id: this.users.length + 1,
                name: v.name,
                surname: v.surname,
                email: v.email,
                dni: v.dni,
              },
            ];
            console.log('RECIBIMOS EL VALOR: ', v);
          } else {
            console.log('SE CANCELO');
          }
        },
      });
  }

  onDeleteUser(userToDelete: IUser): void {
    if (
      confirm(
        `¿Está seguro de eliminar a ${
          userToDelete.name + ' ' + userToDelete.surname
        }?`
      )
    ) {
      this.users = this.users.filter((user) => user.id !== userToDelete.id);
    }
  }

  onEditUser(userToEdit: IUser): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: userToEdit,
      })
      .afterClosed()
      .subscribe({
        next: (userUpdated) => {
          console.log(userUpdated);
          if (userUpdated) {
            this.users = this.users.map((user) => {
              return user.id === userToEdit.id
                ? {
                    ...user,
                    ...userUpdated,
                  }
                : user;
            });
          }
        },
      });
  }
}
