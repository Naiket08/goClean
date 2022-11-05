import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('drawer', { static: true })
  public drawer!: MatDrawer;
  constructor(private route:Router) { }

  ngOnInit(): void {

  }

  public isCollapsed = true;

  menu(value:any){
    this.route.navigateByUrl(value);
    this.drawer.close();
  }

  logout(){
    localStorage.setItem('SeesionUser','');
    this.route.navigateByUrl('/login') 
  }

}
