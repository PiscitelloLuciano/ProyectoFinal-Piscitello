import { Pipe, PipeTransform } from '@angular/core';
import { UsersTableComponent } from '../users-table.component';
import { IUser } from '../../models/model';

@Pipe({
  name: 'nombreApellido',
})
export class NombreApellidoPipe implements PipeTransform {
  transform(element: IUser): string {
    return element.name + ' ' + element.surname;
  }
}
