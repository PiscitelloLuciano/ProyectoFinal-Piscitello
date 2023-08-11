import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/dashboard/pages/users/models';
import { AuthService } from '../../services/auth.services';
import { userRegister } from './models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  surnameControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  emailControl = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);
  passwordControl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(7),
  ]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private serv: AuthService, private router: Router) {}

  onCreateUser(v: userRegister): void {
    this.serv.createUser({
      name: v.name,
      surname: v.surname,
      email: v.email,
      password: v.password,
    });
    this.router.navigate(['auth/login']);
  }
}
