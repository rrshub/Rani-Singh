import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiTreeData } from '../sidenav/sidenav.model';
import { getCanvasInfoDetailModel } from '../createcanvas/createcanvas.model';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  
  Configdata = new BehaviorSubject<any>('');
  globalVar: any
  emailAddress:string
  clientId:string
  public getCanvasInfoDetail = new getCanvasInfoDetailModel();
  public canvasValidationCheck:boolean = true
  constructor(private httpClient: HttpClient) {
    
  }

  loadConfigData =()=>{
    this.httpClient.get("assets/config.json").subscribe(data =>{
       this.Configdata.next(data)  
           
    })
  }
  
  loadObjectMenuData=():Observable<ApiTreeData>=>{
    let apiURL = this.Configdata.value.ServiceAPILink +  this.Configdata.value.GetUserMenu
    
    let body = { }
    
   return this.httpClient.post<ApiTreeData>(apiURL,body).pipe(
      retry(1),
      catchError(this.errorHandl)
      )
    }
  
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
   
  }

  
