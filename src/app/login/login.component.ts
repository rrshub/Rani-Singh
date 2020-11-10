import { Component, OnInit } from '@angular/core';
import { Login, loginSuccessModel } from './login.model'
import { SharedService } from '../common/shared.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginSuccessModel = new loginSuccessModel()
  public loginModel: Login
  public breakpoint: number
  public loginForm: FormGroup

  constructor(private sharedService: SharedService,
              private loginService: LoginService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    const numericNumberReg= "^[0-9]*$";
    this.loginForm = this.fb.group({
      clientID: ['',[Validators.required,Validators.pattern(numericNumberReg)]],
      emailId: ['',Validators.required],
      password: ['',Validators.required]
    });
    if(localStorage.getItem('token') !== null){
      this.router.navigate(['/dashboard'])
      
    }
  }

 public onLogin = () => {
   this.sharedService.clientId=this.loginForm.value.clientID
   this.sharedService.emailAddress=this.loginForm.value.emailId
    let loginApiCallBody = {
      "clientid": this.loginForm.value.clientID,
      "emailaddress": this.loginForm.value.emailId,
      "password": this.loginForm.value.password
    }
    this.loginService.loginCheck(loginApiCallBody).subscribe(res=>{
      this.loginSuccessModel = res
      console.log('this.loginSuccessModel',this.loginSuccessModel)
      if(this.loginSuccessModel.status === "true"){
        localStorage.setItem('token', this.loginSuccessModel.data.UserToken);
        this.router.navigate(['/dashboard'])
        
       
      }
    })
 }

}
