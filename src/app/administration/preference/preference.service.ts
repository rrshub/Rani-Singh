import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../../assets/config.json'
import { clientPreferenceModel ,PreferenceData} from '../preference/preference.model';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any


constructor( public httpClient: HttpClient,) { }


  public getClientPreference(data): Observable<any>  {
    return this.httpClient.post<clientPreferenceModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientPreference, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }
  public updateClientPreference(data): Observable<any>  {
    return this.httpClient.post<PreferenceData>(this.ConfigData.ServiceAPILink + this.ConfigData.updateClientPreference, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

}
