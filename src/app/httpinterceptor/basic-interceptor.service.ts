import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpHeaders ,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SharedService } from '../common/shared.service';

@Injectable({
  providedIn: 'root'
})
export class BasicInterceptorService implements HttpInterceptor{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('I am Interceptor')
    request = request.clone({
      headers : new HttpHeaders({
              "Content-Type":"application/json",
              "Cache-Control":"private,max-age=0,no=cache",
              "Pragma":"no-cache"
      }),
      body: {...request.body, 
                "clientid": 1015,
                "emailaddress": "suraj@arosys.com",
                "x-access-token": localStorage.getItem('token')
      
       }
    })
   
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
           
             if(!event.body.tokenstatus){
               console.log('The Body of Response',event.body.tokenstatus)
              // this.router.navigateByUrl('/login')
             }
                         
            
          }
          return event;
      }));
  }

  constructor(private router: Router,private sharedSrvice:SharedService) { }
}
