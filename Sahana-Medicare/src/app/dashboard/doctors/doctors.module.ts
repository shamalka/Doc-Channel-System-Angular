import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from './doctors.component';
import { HttpClient } from 'selenium-webdriver/http';
import { DataService } from 'src/app/services/data.service';
import { Appointment } from 'src/app/models/appointment';

@NgModule({
  declarations: [DoctorsComponent],
  imports: [
    CommonModule
  ]
})
export class DoctorsModule implements OnInit {

  userId:string = "userid";
  appointments:Object;

  constructor(private data: DataService, private http:HttpClient) { }

  ngOnInit(){
    this.data.getAppointments().subscribe(data =>{
      this.appointments = data;
      console.log(this.appointments);
    })
  }
}
