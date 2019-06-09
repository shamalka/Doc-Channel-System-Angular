import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReportformComponent } from './reportform/reportform.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule
} from '@angular/material';

import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from 'app/layouts/home-layout/auth/login/login.component';
import { RegisterComponent } from 'app/layouts/home-layout/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReportformComponent,
    ReportsComponent,
    LoginComponent,
    RegisterComponent,
    AppointmentFormComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  entryComponents: [ReportformComponent, ReportsComponent, LoginComponent, RegisterComponent, AppointmentFormComponent]
})
export class ComponentsModule { }
