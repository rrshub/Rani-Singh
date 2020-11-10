import { Component, OnInit } from '@angular/core';
import { Applytiebreak } from './tie-breaker.model';
import { TieBreakService } from './tie-break.service';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';


@Component({
  selector: 'app-tie-breaker',
  templateUrl: './tie-breaker.component.html',
  styleUrls: ['./tie-breaker.component.scss'],
  providers:[ ProgressSpinnerComponent]
})
export class TieBreakerComponent implements OnInit {
  public tiebreakermodel= new Applytiebreak()
  public dropDownTestx=false
  public CanvasProgressSpinner
  public AttrProgressSpinner
  model:any;
  constructor(
    private TieBreakService: TieBreakService,
  ) { }

  ngOnInit() {
   this.Onclicktiebreak()
  }

  public   async  Onclicktiebreak(){
    let tiebreak={
      // "emailaddress": sessionStorage.getItem('ClientemailAddress'),
      // "x-access-token": sessionStorage.getItem('ClientToken'),
      // "clientid": sessionStorage.getItem('Clientid'),
    }
    this.CanvasProgressSpinner   = true
    this.tiebreakermodel = await  this.TieBreakService.getTieBreak(tiebreak).toPromise()
    console.log( 'tiebreakermodel ',this.tiebreakermodel)
    if (this.tiebreakermodel.success=="true") {
      this.dropDownTestx=true
    }
    this.CanvasProgressSpinner   = false

  }

}
  