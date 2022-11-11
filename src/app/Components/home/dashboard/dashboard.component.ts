import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { get } from 'firebase/database';
import * as userDetails from 'src/app/Store/userInfo/userInfo.action';
import { UserinfoService } from '../../helper/userinfo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userInformation: any;

  constructor(private store: Store, public userdata: UserinfoService) {
    this.setData();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  public setData() {
    const data = this.userdata.currentUserUniqueId;
    if (data) {
      this.userdata.getUserInfo();

    }
  }
  data = this.userdata.currentUserUniqueId;


}
