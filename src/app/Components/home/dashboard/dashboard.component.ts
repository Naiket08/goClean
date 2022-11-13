import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { get } from 'firebase/database';
import * as userDetails from 'src/app/Store/userInfo/userInfo.action';
import { UserinfoService } from '../../helper/userinfo.service';
import { Store } from '@ngrx/store';
import { Service, FeatureCollection } from 'src/app/map.service';

@Component({
  selector: 'app-dashboard',
  providers: [Service],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userInformation: any;

  textSection1_2 = "Get Cleaning with GoClean!";
  textSection1 = "Hello! Rohan";

  projection: any;
  roomsData: FeatureCollection;
  buildingData: FeatureCollection;


  constructor(private store: Store, public userdata: UserinfoService, service: Service) {
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

  customizeTooltip(arg: { layer: { name: string; }; attribute: (arg0: string) => any; }) {
    if (arg.layer.name === 'rooms') {
      return {
        text: `Square: ${arg.attribute('square')} ft&#178`,
      };
    }
    else{
      return;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.changeTextSection2();
    }, 2000)
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  changeTextSection2() {
    this.textSection1 = this.textSection1_2;
  }

  public setData() {
    const data = this.userdata.currentUserUniqueId;
    if (data) {
      this.userdata.getUserInfo();

    }
  }
  data = this.userdata.currentUserUniqueId;
}