import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { get } from 'firebase/database';
import * as userDetails from 'src/app/Store/userInfo/userInfo.action';
import { UserinfoService } from '../../helper/userinfo.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userInformation: any;

   textSection1_2 = "Get Cleaning with GoClean!";
   textSection1 = "Hello! Rohan";


  constructor(private store: Store, public userdata: UserinfoService) {
this.setData();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.changeTextSection2();
    }, 2000)
    
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  changeTextSection2(){


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
