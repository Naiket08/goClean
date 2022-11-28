import { Component, Input, OnInit, HostListener,SimpleChanges } from '@angular/core';
import { userDetails } from 'src/app/models/userInfo.model';


@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.scss']
})
export class RecycleBinComponent implements OnInit {
  @Input() public userInfo: any; // decorate the property with @Input()


  empty:boolean | undefined;

  colorOfDevice = "black";
  constructor() {
  }


  ngOnChanges(change: SimpleChanges){
    if(change.userInfo && this.userInfo){
      this.empty= this.userInfo.users!.devices.DustbinStatus;
      console.log(this.empty);
    }
  }

  flipStatus = false; //this flag used to flip the laundry card to detergent 
  

  onClickChangeToDetergent () {

    this.flipStatus = !this.flipStatus;

  }




  public statusTextON =  "Trash can is not full yet";
  public statusTextOFF =  "Trash can full. Kindly discard your trash !!";





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
