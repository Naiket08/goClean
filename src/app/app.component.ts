import { Component, OnInit } from '@angular/core';

import introJs from 'intro.js';
import { IntrojsService } from './introjs.service';
import { UserinfoService } from './Components/helper/userinfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'goClean';
  constructor(public introJs: IntrojsService, public uesrinfo : UserinfoService) {
    this.uesrinfo.getUserInfo();

  }

  ngOnInit() {
  }
}
