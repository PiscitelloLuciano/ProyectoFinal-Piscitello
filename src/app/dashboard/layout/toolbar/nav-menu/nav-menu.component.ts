import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.services';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  public isAdmin$: Observable<boolean>;
  constructor(
    private serv: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  logOut() {
    this.serv.logOut();
    this.router.navigate(['auth', 'login'], {});
  }
}
