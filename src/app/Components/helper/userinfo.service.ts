
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as userData from 'src/app/Store/userInfo/userInfo.action';
import { map, Observable, pipe } from 'rxjs';
import { userDetails } from 'src/app/models/userInfo.model';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  currentUserUniqueId = "";
  userdata: any = ""
  result: userDetails | undefined;


  constructor(private httpClient: HttpClient, private store: Store,) {

  }

  public getCurrentUserUniqueId(data: any) {
    this.currentUserUniqueId = data;
  }

  getUserInfo() {
    const users = this.httpClient.get("https://goclean-995b3-default-rtdb.firebaseio.com/Customers/" + this.currentUserUniqueId + ".json");
    users.subscribe((data: any) => {
      console.log(data.devices.laundryBasketStatus);
      this.result = data;
      this.store.dispatch(userData.postUsers({users: data}));
    })

    return users as Observable<userDetails>;
  }





}
