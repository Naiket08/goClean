import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  currentUserUniqueId = "";
  userdata :any = ""


  constructor( private httpClient: HttpClient) { 
    
  }

  public getCurrentUserUniqueId( data : any){
    this.currentUserUniqueId  = data;
    console.log(this.currentUserUniqueId);
  }

  getUserInfo(){
    return this.httpClient.get("https://goclean-995b3-default-rtdb.firebaseio.com/Customers/" + this.currentUserUniqueId + ".json");
  }


  
  

}
