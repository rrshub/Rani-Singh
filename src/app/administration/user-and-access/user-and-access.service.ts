import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../../assets/config.json'
import { ClientModel, popUpData } from './user-and-access.model';


@Injectable({
  providedIn: 'root'
})
export class UserAndAccessService {

    public ConfigData: any = ConfigData
    public apiUrl: string
    public headers: any
    public options: any
  
    constructor(public httpClient: HttpClient,){}
    public getClientDetail(): Observable<ClientModel>  {
        return this.httpClient.post<ClientModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientAdmindetail, {})
          .pipe(
            catchError((error: HttpErrorResponse) => {
              return observableThrowError(error.error)
            }))
    }

    public insupdtclient(data:popUpData): Observable<popUpData>  {
      return this.httpClient.post<popUpData>(this.ConfigData.ServiceAPILink + this.ConfigData.getclientusermgt, data)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return observableThrowError(error.error)
          }))
    }
}