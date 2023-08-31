import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICreateInscriptionPayload,
  IInscription,
  IInscriptionWithStudentAndCourse,
} from '../models';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor(private http: HttpClient) {}
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

  public deleteInscription(id: number): Observable<IInscription> {
    return this.http.delete<IInscription>(
      environment.baseApiUrl + '/inscriptions/' + id
    );
  }
}
