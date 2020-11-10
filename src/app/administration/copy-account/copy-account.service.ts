import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../../assets/config.json'
import { MaptableData, native } from './copy-account.model';

@Injectable({
  providedIn: 'root'
})
export class CopyAccountService {

  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any

  constructor(
    public httpClient: HttpClient,
  ) { }

  public getclientnativeenable(): Observable<native>  {
      return this.httpClient.post<native>(this.ConfigData.ServiceAPILink + this.ConfigData.getclientnativeenable, {})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return observableThrowError(error.error)
          }))
  }
  public getcrmaccountmappeddata(): Observable<MaptableData>  {
    return this.httpClient.post<MaptableData>(this.ConfigData.ServiceAPILink + this.ConfigData.getcrmaccountmappeddata, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  public updateclientnativeenable(data): Observable<native>  {
    return this.httpClient.post<native>(this.ConfigData.ServiceAPILink + this.ConfigData.updateclientnativeenable, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  public getmappingoperation(data): Observable<MaptableData>  {
    return this.httpClient.post<MaptableData>(this.ConfigData.ServiceAPILink + this.ConfigData.getmappingoperation, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }


}
