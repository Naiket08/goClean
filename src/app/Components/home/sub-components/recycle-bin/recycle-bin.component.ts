import { Component, Input, OnInit, HostListener, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Reset } from '@ngrx/store-devtools/src/actions';
import { getDatabase, ref, update } from 'firebase/database';
import { userDetails } from 'src/app/models/userInfo.model';
import { CleaningCycleComponent } from '../cleaning-cycle/cleaning-cycle.component';


@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.scss']
})
export class RecycleBinComponent implements OnInit {
  @Input() public userInfo: any; // decorate the property with @Input()

  empty: boolean | undefined;

  colorOfDevice = "black";
  recycleInit: string | undefined;
  constructor(private dialog: MatDialog) {
  }


  ngOnChanges(change: SimpleChanges) {
    if (change.userInfo && this.userInfo) {
      this.empty = this.userInfo.users!.devices.DustbinStatus;
      this.recycleInit = this.userInfo.users!.devices.Dustbin;
      console.log(this.empty);
    }
  }

  flipStatus = false; //this flag used to flip the laundry card to detergent 


  onClickChangeToDetergent() {

    this.flipStatus = !this.flipStatus;

  }




  public statusTextON = "Trash can is not full yet";
  public statusTextOFF = "Trash can full. Kindly discard your trash !!";
  public statusText = "Kindly initiate trash can";




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

    if (this.getScreenWidth > 720) {
      this.colorOfDevice = 'white';
    }

    else {
      this.colorOfDevice = 'black';
    }
  }
  public callIntroJs() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Trash Can',
      source: 'TC',
      label: 'Would you like to initiate the trash can to proceed?'
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
        Dustbin: 'I'
      });
      this.recycleInit = 'I'
      this.statusText = "Trash can initiated";

    });
  }


}
