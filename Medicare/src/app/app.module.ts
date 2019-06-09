import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';


import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MainpageComponent } from './layouts/home-layout/mainpage/mainpage.component';
import { HomeNavbarComponent } from './layouts/home-layout/home-navbar/home-navbar.component';
import { LoginComponent } from './layouts/home-layout/auth/login/login.component';
import { HomeMidComponent } from './layouts/home-layout/home-mid/home-mid.component';
import { MatProgressSpinnerModule, MatChipsModule } from '@angular/material';
import { DoctorsComponent } from './layouts/home-layout/pages/doctors/doctors.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MainpageComponent,
    HomeNavbarComponent,
    HomeMidComponent,
    DoctorsComponent,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
