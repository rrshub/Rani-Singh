import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { LeadModel, popUpData } from './leadangeluserlist.model';
import ConfigData from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class LeadangeluserlistService {
  public ConfigData: any = ConfigData
  public auth = {
    "emailaddress": "suraj@arosys.com",
    "x-access-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2eWFrYXJhZG1pbmlkIjoyLCJpYXQiOjE2MDUwMTAxMDcsImV4cCI6MTYwNTA5NjUwN30.oJg3H-SJFvZNMx6DwQDnZ346KwcfPHePiz5CAsMSYCM",
    "clientid": "0"
  };


  constructor(public http:HttpClient) {  }

  public getVyakarClient(): Observable<LeadModel>  {
    return this.http.post<LeadModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getUserdetail,this.auth)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
}
  public insupdateDelClient(data:popUpData):Observable<popUpData>{
    return this.http.post<popUpData>(this.ConfigData.ServiceAPILink + this.ConfigData.insUserdetail,{...data,...this.auth}).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }));
  }
}