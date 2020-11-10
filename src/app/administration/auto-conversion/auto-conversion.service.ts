import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../../assets/config.json'
import { AutoConversionModel ,AutoConversionData} from './auto-conversion.model';

@Injectable({
  providedIn: 'root'
})
export class AutoConversionService {
  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any
constructor( public httpClient: HttpClient,) { }

  public getAutoConversionRules(data): Observable<any>  {
    return this.httpClient.post<AutoConversionModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientPreference, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

}
