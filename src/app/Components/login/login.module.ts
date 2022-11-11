import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login.component';
import { UserinfoService } from './../helper/userinfo.service';
import { reducers } from './../../Store/userInfo/userInfo.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', reducers)
  ],
  providers: [UserinfoService],
  declarations: [],
  exports: [],
})
export class LoginModule {}