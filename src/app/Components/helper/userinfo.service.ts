import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  currentUserUniqueId = "";

  constructor() { }

  public getCurrentUserUniqueId( data : any){
    this.currentUserUniqueId  = data;
  }
}
