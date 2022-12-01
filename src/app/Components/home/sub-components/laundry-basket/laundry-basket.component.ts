import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, Input, OnInit, SimpleChanges, HostListener, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { resultMemoize, select, Store } from '@ngrx/store';
import { getDatabase, ref, update } from 'firebase/database';
import { IntrojsService } from 'src/app/introjs.service';
import { GlobalStateInterface } from 'src/app/models/globalState.interface';
import { userDetails } from 'src/app/models/userInfo.model';
import { UserInfoState } from 'src/app/Store/userInfo/userInfo.state';
import { CleaningCycleComponent } from '../cleaning-cycle/cleaning-cycle.component';

@Component({
  selector: 'app-laundry-basket',
  templateUrl: './laundry-basket.component.html',
  styleUrls: ['./laundry-basket.component.scss']
})
export class LaundryBasketComponent implements OnInit {
  @Input() public userInfo: any; // decorate the property with @Input()
  @Input() public newUser: boolean | undefined | null; // decorate the property with @Input()
  isNewUser: boolean = true;
  public laundryStatus: number = 0;
  laundryInit: string | undefined;

  constructor(public introJs: IntrojsService, private store: Store<GlobalStateInterface>, private dialog: MatDialog) {
  }

  public getScreenWidth: any;
  public getScreenHeight: any;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.userInfo && this.userInfo) {
      this.laundryStatus = this.userInfo.users!.devices.laundryBasketStatus;
      this.isNewUser = this.userInfo.users!.userdetails.isNewUser;
      this.laundryInit= this.userInfo.users!.devices.laundryBasket;
    }
  }

  ngOnInit(): void {
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
    this.introJs.featureOne();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Laundry Basket status',
      source: 'LB',
      label: 'Please tell us about the maximum load of your washing machine'
    };

    const data = this.dialog.open(CleaningCycleComponent, dialogConfig);
    data.beforeClosed().subscribe((result) => {
      localStorage.setItem('newUser', 'false');
      const db = getDatabase();
      const UserId = localStorage.getItem('UserID');

      // update(ref(db, 'Customers/' + UserId + '/userdetails/'), {
      //   isNewUser: false
      // });
      update(ref(db, 'Customers/' + UserId + '/devices/'), {
        laundryBasket: 'I'
      });
      this.laundryInit = 'I'
      this.statusText = "Laundry Basket initiated";

    });
  }


  flipStatus = false; //this flag used to flip the laundry card to detergent 



  colorOfDevice = 'black';



  onClickChangeToDetergent() {

    this.flipStatus = !this.flipStatus;

  }



  public color: any = {

    twenty: "#0cf500",
    fourty: "#c8f500",
    sixty: "#f79a16",
    eighty: "#f56016",
    hundred: "#f51616"

  };



  


  public a20 = {
    height: '20%',
    background: '#0cf500'
  }

  public a40 = {
    height: '40%',
    background: '#bbfa32'
  }

  public a60 = {
    height: '60%',
    background: '#f79a16'
  }

  public a80 = {
    height: '80%',
    background: '#f56016'
  }

  public a100 = {
    height: '100%',
    background: '#f51616'
  }

  public a0 = {
    height: '0%',
    background: '#f51616'
  }

  public statusText = "Laundry Basket is empty";

  laundryPercentage = 0;


  public onPercentageChangeColor(): any {
    // if (this.laundryInit === 'I') {
      this.laundryPercentage = (this.laundryStatus/25)*100;
      debugger;
      switch (true) {
        case (this.laundryPercentage===0):
          this.statusText = "Laundry Basket is just 0% keep going";
          return (this.a0);



        case (this.laundryPercentage<=20):
          this.statusText = "Laundry Basket is just 20% keep going";
          return (this.a20);

        case (this.laundryPercentage<=40):
          this.statusText = "Laundry Basket is just 40% keep going";
          return (this.a40);
        case (this.laundryPercentage<=60):
          this.statusText = "Laundry Basket is just 60% keep going";
          return (this.a60);

        case (this.laundryPercentage<=80):
          this.statusText = "Laundry Basket is almost full. Please do laundry";
          return (this.a80);

        case (this.laundryPercentage<=100):
          this.statusText = "Laundry Basket is full. You are good to go complete your laundry";
          return (this.a100);

        default:
          this.statusText = "Kindly initiate laundry basket";
          if (this.laundryInit === 'I') {
            this.statusText = "Laundry Basket Initiated";
          }
          return (this.a0);

      }

    // }
  }

}
