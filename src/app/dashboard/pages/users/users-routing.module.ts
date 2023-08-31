import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { adminGuard } from 'src/app/core/guards/admin.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        canActivate: [adminGuard],
        component: UserDetailComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
