import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from './crmdatarefresh.component';

@Injectable({
  providedIn: 'root'
})
export class CrmdatarefreshService {
  public auth = {
    "emailaddress": "suraj@arosys.com",
    "x-access-token":   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2eWFrYXJhZG1pbmlkIjoyLCJpYXQiOjE2MDQ0NzExOTUsImV4cCI6MTYwNDU1NzU5NX0.g3kPu1j6aBg-MAx2aRyEKoOCz1kV-mt0U4I7531U_Ok",
    "clientid": "0"
  };

  constructor(public http:HttpClient) { }

  public getCrmUserList(data):Observable<PeriodicElement>{
    return this.http.post<PeriodicElement>("https://test--11-aa.leadangel.com:1601/api/v1/clientmaintenanceoperation",{...this.auth,...data});
  } 
}