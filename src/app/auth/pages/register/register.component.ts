import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/dashboard/pages/users/models';
import { AuthService } from '../../services/auth.services';
import { userRegister } from './models';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  surnameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  emailControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.email,
  ]);
  rolControl = new FormControl<string | null>(null, []);
  passwordControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(7),
  ]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    rol: this.rolControl,
  });

  constructor(
    private serv: AuthService,
    private router: Router,
    private notifier: NotifierService
  ) {}

  onCreateUser(v: userRegister): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.serv.createUser({
        name: v.name,
        surname: v.surname,
        email: v.email,
        password: v.password,
        rol: 'user',
      });
      this.router.navigate(['auth/login']);
    }
  }
}
