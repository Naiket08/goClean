import { Component, Input, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { getDatabase, ref, update } from 'firebase/database';
import { userDetails } from 'src/app/models/userInfo.model';
import { CleaningCycleComponent } from '../cleaning-cycle/cleaning-cycle.component';

@Component({
  selector: 'app-washing-machine',
  templateUrl: './washing-machine.component.html',
  styleUrls: ['./washing-machine.component.scss']
})
export class WashingMachineComponent implements OnInit {
  @Input() public userInfo: any; // decorate the property with @Input()


  colorOfDevice = 'white';

  power: boolean | undefined;
  washingInit: string | undefined;
  statusText: string ="Kindly Initiate washing machine";

  constructor(private dialog: MatDialog) { }

  flipStatus = false; //this flag used to flip the laundry card to detergent 
  

  onClickChangeToDetergent () {

    this.flipStatus = !this.flipStatus;

  }


  ngOnChanges(change: SimpleChanges){
    if(change.userInfo && this.userInfo){
      this.power= this.userInfo.users!.devices.washingMachineStatus;
      this.washingInit = this.userInfo.users!.devices.washingMachine;
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

  public callIntroJs() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Washing Machine',
      source: 'WM',
      label: 'Would you like to initiate the washing machine can to proceed?'
    };

    const data = this.dialog.open(CleaningCycleComponent, dialogConfig);
    data.beforeClosed().subscribe((result: any) => {
      localStorage.setItem('newUser', 'false');
      const db = getDatabase();
      const UserId = localStorage.getItem('UserID');
      console.log(result.description);
      // update(ref(db, 'Customers/' + UserId + '/userdetails/'), {
      //   isNewUser: false
      // });
      update(ref(db, 'Customers/' + UserId + '/devices/'), {
        washingMachine: 'I'
      });
      this.washingInit = 'I'
      this.statusText = "washing machine can initiated";

    });
  }

}
