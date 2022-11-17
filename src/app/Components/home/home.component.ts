import { Component, OnInit, ViewChild ,HostListener} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserinfoService } from '../helper/userinfo.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('drawer', { static: true })
  public drawer!: MatDrawer;
  constructor(private route:Router, public userervicedata : UserinfoService) { }



  public isCollapsed = true;

  menu(value:any){
    this.route.navigateByUrl(value);
    this.drawer.close();
  }

  logout(){
    localStorage.setItem('SeesionUser','');
    localStorage.setItem('UserID','');

    this.route.navigateByUrl('/login') 
    this.userervicedata.getCurrentUserUniqueId("");
  }

  public getScreenWidth: any;
  public getScreenHeight: any;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    // this.introJs.featureOne();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

  }


}
