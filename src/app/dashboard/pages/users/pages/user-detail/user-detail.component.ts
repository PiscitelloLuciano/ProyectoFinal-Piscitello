import { Component } from '@angular/core';
import { IUser } from '../../models';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  public user$: IUser | undefined;

  constructor(
    private serv: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.loadUser();
  }

  loadUser(): void {
    this.serv.getUserById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => {
        this.user$ = user;
      },
    });
  }
}
