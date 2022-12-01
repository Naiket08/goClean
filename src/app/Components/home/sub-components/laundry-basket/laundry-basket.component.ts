import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, Input, OnInit, SimpleChanges, HostListener, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { resultMemoize, select, Store } from '@ngrx/store';
import { getDatabase, ref, set, update } from 'firebase/database';
import { IntrojsService } from 'src/app/introjs.service';
import { GlobalStateInterface } from 'src/app/models/globalState.interface';
import { userDetails } from 'src/app/models/userInfo.model';
import { postNewUser } from 'src/app/Store/userInfo/userInfo.action';
import { newUserSelector, userSelector } from 'src/app/Store/userInfo/userInfo.selector';
import { UserInfoState } from 'src/app/Store/userInfo/userInfo.state';
import { CleaningCycleComponent } from '../cleaning-cycle/cleaning-cycle.component';
import { addDoc, Firestore, collection } from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-laundry-basket',
  templateUrl: './laundry-basket.component.html',
  styleUrls: ['./laundry-basket.component.scss']
})
export class LaundryBasketComponent implements OnInit {
  @Input() public userInfo: any; // decorate the property with @Input()
  @Input() public newUser: boolean | undefined | null; // decorate the property with @Input()
  isNewUser: boolean = true;
  public laundryStatus: number | undefined;

  constructor(public introJs: IntrojsService, private store: Store<GlobalStateInterface>, private dialog: MatDialog, public firestore: Firestore) {

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
      console.log(this.isNewUser);
    }
  }

  ngOnInit(): void {
    console.log(this.userInfo);
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
    console.log(data);
    debugger;
    data.beforeClosed().subscribe((result) => {
      localStorage.setItem('newUser', 'false');
      const db = getDatabase();
      const UserId = localStorage.getItem('UserID');

      update(ref(db, 'Customers/' + UserId + '/userdetails/'), {
        isNewUser: false
      })
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



  public onPercentageChangeColor(): any {
    if (!this.isNewUser) {
      switch (this.laundryStatus) {
        case 20:
          this.statusText = "Laundry Basket is just 20% keep going";
          return (this.a20);

        case 40:
          this.statusText = "Laundry Basket is just 40% keep going";
          return (this.a40);
        case 60:
          this.statusText = "Laundry Basket is just 60% keep going";
          return (this.a60);

        case 80:
          this.statusText = "Laundry Basket is almost full. Please do laundry";
          return (this.a80);

        case 100:
          this.statusText = "Laundry Basket is full. You are good to go complete your laundry";
          return (this.a100);

        default:
          this.statusText = "Intiate Laundry Basket";
          if (!this.isNewUser) {
            this.statusText = "Laundry Basket Initiated";
          }
          return (this.a0);
      }
    }

  }

}
