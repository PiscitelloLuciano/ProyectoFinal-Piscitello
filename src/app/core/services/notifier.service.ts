import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from 'src/app/dashboard/pages/users/models';
import { UserService } from 'src/app/dashboard/pages/users/services/user.service';
import Swal from 'sweetalert2';

interface myCustomNotification {
  title: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private notifier$ = new Subject<myCustomNotification>();
  constructor(private serv: UserService) {
    this.notifier$.subscribe({
      next: (myNotification) => {
        Swal.fire(
          myNotification.title,
          myNotification.text,
          myNotification.type
        );
      },
    });
  }

  showSuccess(text: string, title = 'Realizado'): void {
    this.notifier$.next({
      type: 'success',
      title,
      text,
    });
  }

  showError(text: string, title = 'Error'): void {
    this.notifier$.next({
      type: 'error',
      title,
      text,
    });
  }
  showInfo(text: string, title = 'Información'): void {
    this.notifier$.next({
      type: 'info',
      title,
      text,
    });
  }
}
