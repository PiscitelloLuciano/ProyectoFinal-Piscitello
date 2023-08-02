import { Pipe, PipeTransform } from '@angular/core';
import { UsersTableComponent } from '../../dashboard/pages/users/components/users-table/users-table.component';
import { IUser } from '../../dashboard/pages/users/models';

@Pipe({
  name: 'nombreApellido',
})
export class NombreApellidoPipe implements PipeTransform {
  transform(element: IUser): string {
    return element.name + ' ' + element.surname;
  }
}
