import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../assets/config.json'
import { getCanvasInfoDetailModel, Attributedata } from './createcanvas.model';

@Injectable({
  providedIn: 'root'
})

export class CreateCanvasService {

  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any

  constructor(public httpClient: HttpClient) { }

  public getvykarlookupdata(getvykarlookupdataApiCallBody): Observable<any> {
    
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.getvykarlookupdata, getvykarlookupdataApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))

  }

  public getCanvasInfo(getCanvasInfoApiCallBody): Observable<getCanvasInfoDetailModel> {
    return this.httpClient.post<getCanvasInfoDetailModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getcanvasinfo, getCanvasInfoApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  public UpdateCanvasFilterDetail(UpdateCanvasFilterDetailApiCallBody): Observable<any> {
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.updatefiltercondition, UpdateCanvasFilterDetailApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  public addBlockOperationInfo(addBlockOperationInfoApiCallBody): Observable<any> {
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.blockoperation, addBlockOperationInfoApiCallBody)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }))
  }

  public GetSelectedMenu = (getSelectedMenuapiCallBody) => {
    
      return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.getselectedmenu, getSelectedMenuapiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  public approveCanvasDetail = (getapproveCanvasDetailCallbody) => {

    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.approvecanvas, getapproveCanvasDetailCallbody)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }))
  }

  getappprovedobject = (getappprovedobjectCallBody) => {
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.getappprovedobject, getappprovedobjectCallBody)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }))
  }

}


