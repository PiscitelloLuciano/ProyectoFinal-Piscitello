import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule],
    });

    const component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('El formulario deberia ser inválido si los campos estan vacios'),
    () => {
      component.emailControl.setValue(''),
        component.passwordControl.setValue(''),
        expect(component.loginForm.invalid).toBeTrue();
    };
});
