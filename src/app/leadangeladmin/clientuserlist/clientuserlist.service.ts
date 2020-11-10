import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ClientUserListService {

  public auth = {
    "emailaddress": "suraj@arosys.com",
    "x-access-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2eWFrYXJhZG1pbmlkIjoyLCJpYXQiOjE2MDM5NzI5NDIsImV4cCI6MTYwNDA1OTM0Mn0.Ce4-FWkfZdpv-KHE7gxRIfXlk2f2vYZsO94n7qoz0rQ",
    "clientid": "0"
  };

  constructor(public http:HttpClient) { }

  public getclientUserList(data):Observable<any>{
    return this.http.post<any>("https://test--11-aa.leadangel.com:1601/api/v1/getclientuserlist",{...this.auth,...data});
  }
  public clientList():Observable<any>{
    return this.http.post<any>("https://test--11-aa.leadangel.com:1601/api/v1/getclientlist",this.auth);
  }
  public insertUpdtClientUser(data:FormData):Observable<any>{
    return this.http.post<any>("https://test--11-aa.leadangel.com:1601/api/v1/insupdclientuser",{...data,...this.auth});
  }
}