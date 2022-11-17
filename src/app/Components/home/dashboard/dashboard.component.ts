import { Component, OnInit, SimpleChange, SimpleChanges, HostListener, ElementRef, ViewChild } from '@angular/core';
import { get } from 'firebase/database';
import { UserinfoService } from '../../helper/userinfo.service';
import { select, Store } from '@ngrx/store';
import { Service, FeatureCollection } from 'src/app/map.service';
import { GlobalStateInterface } from 'src/app/models/globalState.interface';
import { Observable } from 'rxjs';
import { userDetails } from 'src/app/models/userInfo.model';
import { userSelector } from 'src/app/Store/userInfo/userInfo.selector';
import { UserInfoState } from 'src/app/Store/userInfo/userInfo.state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CleaningCycleComponent } from '../sub-components/cleaning-cycle/cleaning-cycle.component';

@Component({
  selector: 'app-dashboard',
  providers: [Service],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userInformation: userDetails | undefined;

  textSection1_2 = "Get Cleaning with GoClean!";
  textSection1 = "Hello";
  userInfo$: Observable<userDetails> | undefined;
  projection: any;
  roomsData: FeatureCollection;
  buildingData: FeatureCollection;
  screenWidth = 0;
  userState$: Observable<userDetails | undefined> | undefined;

  // users$: Observable<userDetails>;


  constructor(public userdata: UserinfoService, service: Service, private store: Store<UserInfoState>, private dialog: MatDialog) {
    ;
    this.setData();
    this.roomsData = service.getRoomsData();
    this.buildingData = service.getBuildingData();
    this.projection = {
      to(coordinates: number[]) {
        return [coordinates[0] / 100, coordinates[1] / 100];
      },
      from(coordinates: number[]) {
        return [coordinates[0] * 100, coordinates[1] * 100];
      },
    };
  }


  public getScreenWidth: any;
  public getScreenHeight: any;



  openModel() {

  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }


  customizeTooltip(arg: { layer: { name: string; }; attribute: (arg0: string) => any; }) {
    if (arg.layer.name === 'rooms') {
      return {
        text: `Square: ${arg.attribute('square')} ft&#178`,
      };
    }
    else {
      return;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.changeTextSection2();
    }, 2000)
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  changeTextSection2() {
    this.textSection1 = this.textSection1_2;
  }

  public setData() {
    ;
    const data = this.userdata.currentUserUniqueId ? this.userdata.currentUserUniqueId : localStorage.getItem('UserID');
    if (data) {
      this.userInfo$ = this.userdata.getUserInfo();
      // this.userInfo$.subscribe((data) => {
      //   this.userInformation = data;
      // })
    }
    this.userState$ = this.store.pipe(select(userSelector));
    this.userState$.subscribe((state:any) => {
      this.userInformation= state.users;
    })
  }
  data = this.userdata.currentUserUniqueId;


  displayStyleLaundry = "none";
  displayStyleBin = "none";
  displayStyleWM = "none";


  openPopup(nameOfDevice: String) {

    switch (nameOfDevice) {
      case 'Laundry':
        this.displayStyleLaundry = "block";
        break;

      case 'Bin':
        this.displayStyleBin = "block";
        break;

      case 'WM':
        this.displayStyleWM = "block";
        break;

      default:
        console.log('Somthing really went wrong in open switch');
        break;


    }


  }

  closePopup(nameOfDevice: String) {

    switch (nameOfDevice) {
      case 'Laundry':
        this.displayStyleLaundry = "none";
        break;

      case 'Bin':
        this.displayStyleBin = "none";
        break;

      case 'WM':
        this.displayStyleWM = "none";
        break;
      default:
        console.log('Somthing really went wrong in close switch');
        break;


    }





  }
  openForm() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
  };

    this.dialog.open(CleaningCycleComponent, dialogConfig);
  }


  flipDevices = false;
  
  onFlipDevice1(){
    this.flipDevices = false;
  }

  onFlipDevice2(){
    this.flipDevices = true;
  }






}
