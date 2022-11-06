import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { get } from 'firebase/database';
import { UserinfoService } from '../../helper/userinfo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userInformation: any;

  constructor(public userdata: UserinfoService) {
    debugger;
this.setData();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  public setData() {
    const data = this.userdata.currentUserUniqueId;
    if (data) {
      this.userdata.getUserInfo().subscribe(value=>
      this.userInformation=value);
      console.log(this.userInformation);
    
    }
  }
  data = this.userdata.currentUserUniqueId;



  getUserInfor() {
    console.log(this.userdata.currentUserUniqueId);
    this.userdata.getUserInfo().subscribe(value=>
      this.userInformation=value);
      console.log(this.userInformation);

  }



}
