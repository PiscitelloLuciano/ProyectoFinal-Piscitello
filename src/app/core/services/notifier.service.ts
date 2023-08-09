import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

interface myCustomNotification {
  type: 'success' | 'error' | 'info';
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private notifier$ = new Subject<myCustomNotification>();
  constructor() {
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
