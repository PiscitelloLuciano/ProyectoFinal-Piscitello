import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public emailControl = new FormControl('Fizz@lol.com', [
    Validators.required,
    Validators.email,
  ]);
  public passwordControl = new FormControl('45589231', [
    Validators.required,
    Validators.minLength(7),
  ]);

  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private serv: AuthService, private router: Router) {}

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.serv.login(this.loginForm.getRawValue());
    }
  }
}
