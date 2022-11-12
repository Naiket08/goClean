
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as userData from 'src/app/Store/userInfo/userInfo.action';
import { map, Observable } from 'rxjs';
import { userDetails } from 'src/app/models/userInfo.model';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  currentUserUniqueId = "";
  userdata: any = ""
  result: any;


  constructor(private httpClient: HttpClient, private store: Store,) {

  }

  public getCurrentUserUniqueId(data: any) {
    this.currentUserUniqueId = data;
    console.log(this.currentUserUniqueId);
  }

  getUserInfo() {
    const users = this.httpClient.get("https://goclean-995b3-default-rtdb.firebaseio.com/Customers/" + this.currentUserUniqueId + ".json");
    users.subscribe((data: any) => {
      console.log(data.devices.laundryBasketStatus);
      this.result = data;
    })
    console.log(this.result);
    // this.store.dispatch(userData.postUsers(this.result.userDetails));
    console.log(users);
    console.log(JSON.stringify(users));
    // .pipe(map((res:any) => {console.log(res.devices)})).subscribe((result:any)=>{
    //   this.result=result;
    //   console.log(this.result);
    // })
    return users;


  }





}
