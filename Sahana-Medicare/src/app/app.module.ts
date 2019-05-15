import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { ContactComponent } from './views/contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './dashboard/doctors/doctors.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorLayoutComponent } from './layout/doctor-layout/doctor-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    DashboardComponent,
    DoctorsComponent,
    LoginComponent,
    RegisterComponent,
    AppointmentsComponent,
    PatientLayoutComponent,
    AuthLayoutComponent,
    DoctorLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
