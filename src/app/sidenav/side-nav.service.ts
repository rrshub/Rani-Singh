import { Injectable } from '@angular/core';
import { SharedService } from '../common/shared.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor(private sharedService: SharedService,private httpClient: HttpClient) { }

  performMenuOperation=(treeNodeData: any, dialogData:any,action: string):Observable<any>=>{
    let apiURL = this.sharedService.Configdata.value.ServiceAPILink +  this.sharedService.Configdata.value.MenuOperation
    console.log('The TreeNemu Data',treeNodeData)
    console.log('The TreeNemu Data dialog Data',dialogData)
    console.log('The TreeNemu Data dialog Data',action)
    let apiAction = ''
    
    if(action == 'NEW_OBJECT' || action == 'NEW_FOLDER'){
      apiAction = 'ADD'
    }
    if(action== 'DELETE'){
      apiAction = 'DELETE'
    }
    if(action== 'RENAME'){
      apiAction = 'RENAME'
    }
       
    let body = {
      // "emailaddress" : "suraj@arosys.com",
      // "x-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2eWFrYXJhZG1pbmlkIjo0LCJlbWFpbGFkZHJlc3MiOiJzdXJhakBhcm9zeXMuY29tIiwiaWF0IjoxNTk2MDM2NjU1LCJleHAiOjE1OTYxMjMwNTV9.e2aHV8DIMLsUe9rn7YWDVKcIJGv5znBe-aObrgurFFU",
      // "clientid": "1008",
      "submenuid": treeNodeData.MenuId,
      "isfolder": action ==='NEW_OBJECT' ? "0" : "1",
      "parentid": action ==='DELETE' ? treeNodeData.ParentId :  treeNodeData.MenuId,
      "name": !dialogData.menuname ? "" : dialogData.menuname,
      "menucondition": treeNodeData.MenuCondition,
      "menudesc": !dialogData.menudesc ? "" : dialogData.menudesc,
      "operationtype": apiAction
    }
   
    
   return this.httpClient.post<any>(apiURL,body).pipe(
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
