import { Component, OnInit, HostListener, Input, SimpleChanges } from '@angular/core';
import { userDetails } from 'src/app/models/userInfo.model';

@Component({
  selector: 'app-airvent',   
  templateUrl: './airvent.component.html',
  styleUrls: ['./airvent.component.scss']
})
export class AirventComponent implements OnInit {

  @Input() public userInfo: any; // decorate the property with @Input()


  colorOfDevice = 'white';

  power:boolean | undefined;

  ngOnChanges(change: SimpleChanges){
    if(change.userInfo && this.userInfo){
      this.power= this.userInfo.users!.devices.ventStatus;
      console.log(this.power);
    }
  }

  constructor() { }

  flipStatus = false; //this flag used to flip the laundry card to detergent 
  

  onClickChangeToDetergent () {

    this.flipStatus = !this.flipStatus;

  }




  public statusTextON =  "Air Vents are Dirty";
  public statusTextOFF =  "Air Vents are is CLEAN";

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
