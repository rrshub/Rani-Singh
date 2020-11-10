
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../assets/config.json'
import { loginSuccessModel } from './login.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

 public ConfigData: any = ConfigData
 public apiUrl: string
 public headers: any
 public options: any 

  constructor(public httpClient: HttpClient) { }

  public loginCheck(loginApiCallBody): Observable<loginSuccessModel> {
    return this.httpClient.post<loginSuccessModel>(this.ConfigData.ServiceAPILink + this.ConfigData.loginUrl, loginApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }
  public getconfigdetails(loginApiCallBody): Observable<loginSuccessModel> {
    return this.httpClient.post<loginSuccessModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getconfigdetails, loginApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }
}

