import { Component, OnInit, SimpleChange, SimpleChanges, HostListener, ElementRef, ViewChild } from '@angular/core';
import { get, getDatabase, ref, update } from 'firebase/database';
import { UserinfoService } from '../../helper/userinfo.service';
import { select, Store } from '@ngrx/store';
import { Service, FeatureCollection } from 'src/app/map.service';
import { GlobalStateInterface } from 'src/app/models/globalState.interface';
import { Observable } from 'rxjs';
import { userDetails } from 'src/app/models/userInfo.model';
import { newUserSelector, userSelector } from 'src/app/Store/userInfo/userInfo.selector';
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
  firstTimeUser$: Observable<boolean | undefined> | undefined;
  isNewUser: boolean | undefined;
  demo = ['Kitchen', 'Living Room', 'Bedroom', 'Bathroom']

  // users$: Observable<userDetails>;


  constructor(public userdata: UserinfoService, service: Service, private store: Store<UserInfoState>, private dialog: MatDialog) {
    this.setData();
    this.roomsData = service.getRoomsData();
    // this.customizeColor = this.customizeColor.bind(this);
    // this.customizeTooltip = this.customizeTooltip.bind(this);
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

  openForm() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Cleaning Cycle',
      source: 'DB',
    };

    const data = this.dialog.open(CleaningCycleComponent, dialogConfig);
    data.beforeClosed().subscribe((result) => {
      localStorage.setItem('newUser', 'false');
      const db = getDatabase();
      const UserId = localStorage.getItem('UserID');

      update(ref(db, 'Customers/' + UserId + '/userdetails/'), {
        isNewUser: false
      });
      this.isNewUser = false;
      window.location.reload();
    });
  }

  customizeTooltip(arg: { attribute: (arg0: string) => any; }) {
    const name = arg.attribute('name');
    if (this.isNewUser) {
      return {
        text: `Kindly Initialise cleaning cycle`
      };
    }
    if (this.demo.includes(name)) {
      return {
        text: `${name} is clean`
      };
    }
    else {
      return {
        text: `Time to clean the ${name}`
      };
    }
  }


  customizeColor(elements: any[]) {
    if (!this.isNewUser) {
      console.log(this.userInformation);
      if (this.userInformation && this.userInformation.room) {
        // this.demo = ['Kitchen','Bedroom', 'Living Room']

        if (this.userInformation.room.room1)
          this.demo = ['Bedroom', 'Kitchen', 'Living Room']

        else if (this.userInformation.room.room2) {
          this.demo = ['Kitchen', 'Bedroom', 'Bathroom']
        }
        else if (this.userInformation.room.room3) {
          this.demo = ['Bathroom', 'Kitchen', 'Living Room']
        }
        else if (this.userInformation.room.room4) {
          this.demo = ['Living Room', 'Bathroom', 'Bedroom']
        }
      
      }
      elements.forEach((element) => {
        const room = element.attribute('name');
        if (!this.demo.includes(room)) {
          element.applySettings({
            color: '#CC5C5E'
          });
        }
      });
    }
    else {
      this.demo = ['Living Room', 'Bathroom', 'Bedroom','Kitchen'];
      elements.forEach((element) => {
        const room = element.attribute('name');
        if (!this.demo.includes(room)) {
          element.applySettings({
            color: '#8b0010'
          });
        }
      });
    }

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.changeTextSection2();
    }, 2000)
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    // if (this.userInformation && this.userInformation.room) {
    //   this.customizeColor = this.customizeColor.bind(this);
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userInformation && this.userInformation) {
      this.setData();
    }
  }

  changeTextSection2() {
    this.textSection1 = this.textSection1_2;
  }

  public async setData() {
    const data = this.userdata.currentUserUniqueId ? this.userdata.currentUserUniqueId : localStorage.getItem('UserID');
    if (data) {
      this.userInfo$ = this.userdata.getUserInfo();
      // this.userInfo$.subscribe((data) => {
      //   this.userInformation = data;
      // })
    }
    this.userState$ = this.store.pipe(select(userSelector));
    await this.userState$.subscribe((state: any) => {
      this.userInformation = state.users;
      this.isNewUser = this.userInformation?.userdetails.isNewUser;
      if (state.users && state.users.room) {
        this.customizeColor = this.customizeColor.bind(this);
        this.customizeTooltip = this.customizeTooltip.bind(this);
      }
    })
    this.firstTimeUser$ = this.store.pipe(select(newUserSelector));
    this.firstTimeUser$.subscribe((state: any) => {
    })
  }
  data = this.userdata.currentUserUniqueId;


  displayStyleLaundry = "none";
  displayStyleBin = "none";
  displayStyleWM = "none";
  displayStyleAV = "none";


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
      case 'AV':
        this.displayStyleAV = "block";
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
      case 'AV':
        this.displayStyleAV = "none";
        break;
      default:
        console.log('Somthing really went wrong in close switch');
        break;


    }





  }



  flipDevices = false;

  onFlipDevice1() {
    this.flipDevices = false;
  }

  onFlipDevice2() {
    this.flipDevices = true;
  }






}
