import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../../assets/config.json'
import { Applytiebreak ,} from './tie-breaker.model';

@Injectable({
  providedIn: 'root'
})
export class TieBreakService {
  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any
constructor( public httpClient: HttpClient,) { }

public getTieBreak(data): Observable<any>  {
  return this.httpClient.post<Applytiebreak>(this.ConfigData.ServiceAPILink + this.ConfigData.gettieBreaker, data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }))
}

}