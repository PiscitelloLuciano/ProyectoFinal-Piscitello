import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import {
  ICreateInscriptionPayload,
  IInscription,
  IInscriptionWithStudentAndCourse,
} from '../models';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../store/inscriptions.actions';
import { selectInscriptions } from '../store/inscriptions.selectors';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  public inscriptions$ = new BehaviorSubject<IInscription[]>([]);
  constructor(private http: HttpClient, private store: Store) {}
  public getInscriptions(): Observable<IInscriptionWithStudentAndCourse[]> {
    return this.http.get<IInscriptionWithStudentAndCourse[]>(
      environment.baseApiUrl + '/inscriptions?_expand=student&_expand=course'
    );
  }

  public createInscription(
    payload: ICreateInscriptionPayload
  ): Observable<IInscription> {
    return this.http.post<IInscription>(
      environment.baseApiUrl + '/inscriptions',
      payload
    );
  }

  deleteInscriptionWithSweetalert(id: number): Observable<IInscription> {
    return new Observable((observer) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se borrará permanentemente',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.http
            .delete(environment.baseApiUrl + '/inscriptions/' + id)
            .subscribe(
              () => {
                observer.next();
                observer.complete();
                Swal.fire(
                  'Eliminado',
                  `Ha sido eliminado con éxito`,
                  'success'
                );
              },
              (error) => {
                observer.error(error);
                observer.complete();
              }
            );
        } else {
          observer.complete();
        }
      });
    });
  }

  public loadInscriptions(): void {
    this.http
      .get<IInscriptionWithStudentAndCourse[]>(
        environment.baseApiUrl + '/inscriptions'
      )
      .pipe(
        map((inscriptions) =>
          InscriptionsActions.loadInscriptionsSuccess({ data: inscriptions })
        ),
        catchError((error) =>
          of(InscriptionsActions.loadInscriptionsFailure({ error }))
        )
      )
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }
}
