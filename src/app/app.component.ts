import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from './common/shared.service';

export let browserRefresh = false

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LeadAngel';
  subscription: Subscription
  constructor(private sharedService: SharedService,
    public router: Router) {
    //  jiwan
  // this.router.navigate(['/dashboard'])
    //this.router.navigate(['/leadangeladmin'])

    
    this.sharedService.loadConfigData()
    
  }
}
