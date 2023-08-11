import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.services';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IUser } from 'src/app/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { RouterMock } from 'src/app/core/mocks/router.mock';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: Router,
          useClass: RouterMock,
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Si el login es valido, authUser$ deberia emitir un valor', (done) => {
    const mockUser: IUser = {
      id: 1,
      name: 'fake',
      surname: 'fakeSurname',
      email: 'fake@fake.com',
      password: '123456789',
    };

    const mockResponse: IUser[] = [mockUser];

    service.login({
      email: mockUser.email,
      password: mockUser.password,
    });

    httpController
      .expectOne({
        method: 'GET',
        url: `http://localhost:3000/users?email=${mockUser.email}&password=${mockUser.password}`,
      })
      .flush(mockResponse);

    service.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(mockUser);
        done();
      },
    });
  });
});
