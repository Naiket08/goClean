
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './Components/home/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { AuthguardServiceService } from './authguard-service.service';
import { LaundryBasketComponent } from './Components/home/sub-components/laundry-basket/laundry-basket.component';
import { RecycleBinComponent } from './Components/home/sub-components/recycle-bin/recycle-bin.component';
import { WashingMachineComponent } from './Components/home/sub-components/washing-machine/washing-machine.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './Store/userInfo/userInfo.reducer';
import { DxVectorMapModule } from 'devextreme-angular';
import {MatDialogModule} from '@angular/material/dialog';
import { CleaningCycleComponent } from './Components/home/sub-components/cleaning-cycle/cleaning-cycle.component';
import { AirventComponent } from './Components/home/sub-components/airvent/airvent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    LaundryBasketComponent,
    RecycleBinComponent,
    WashingMachineComponent,
    CleaningCycleComponent,
    AirventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    DxVectorMapModule,
    MatIconModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatMenuModule,
    MatSidenavModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    NgbCollapseModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    providePerformance(() => getPerformance()),
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('users', reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    AuthguardServiceService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DashboardComponent]
})
export class AppModule { }
