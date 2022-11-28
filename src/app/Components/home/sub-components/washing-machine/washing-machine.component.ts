import { Component, Input, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { userDetails } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-washing-machine',
  templateUrl: './washing-machine.component.html',
  styleUrls: ['./washing-machine.component.scss']
})
export class WashingMachineComponent implements OnInit {
  @Input() public userInfo: any; // decorate the property with @Input()


  colorOfDevice = 'white';

  power:boolean | undefined;

  constructor() { }

  flipStatus = false; //this flag used to flip the laundry card to detergent 
  

  onClickChangeToDetergent () {

    this.flipStatus = !this.flipStatus;

  }


  ngOnChanges(change: SimpleChanges){
    if(change.userInfo && this.userInfo){
      this.power= this.userInfo.users!.devices.washingMachineStatus;
      console.log(this.power);
    }
  }

 

  public statusTextON =  "Washing Machine is ON";
  public statusTextOFF =  "Washing Machine is OFF";

  public getScreenWidth: any;
  public getScreenHeight: any;


  

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }


  ngOnInit(): void {
    // this.introJs.featureOne();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if(this.getScreenWidth>720){
      this.colorOfDevice = 'white';
    }

    else{
      this.colorOfDevice = 'black';
    }
  }

}
