import { Component, OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProgressSpinnerComponent} from '../../progress-spinner/progress-spinner.module';



@Component({
  selector: 'app-entermultiplevalues',
  templateUrl: './entermultiplevalues.component.html',
  styleUrls: ['./entermultiplevalues.component.scss'],
  providers:[ProgressSpinnerComponent]
})
export class EntermultiplevaluesComponent implements OnInit {
  height:number=130
  constructor(@Inject(MAT_DIALOG_DATA) private mdDialogRef: MatDialogRef<EntermultiplevaluesComponent>) { 

  }
public MultipleProgressSpinner=true
public ProgressSpinnermode = 'indeterminate';
  taskTypeAreas: {
    name: string;
  }[] = [
    {
      name: 'Area 1'
    },
    {
      name: 'Area 2'
    },
    {
      name: 'Area 3'
    },
  ];
  selectedOptions: string[] = [

  ];
  selectdItem:string[]=[]

  ngOnInit(){
  }

  onNgModelChange(event){
   
    this.selectdItem=event
    console.log('on ng model change', event,);
    
  }
}
