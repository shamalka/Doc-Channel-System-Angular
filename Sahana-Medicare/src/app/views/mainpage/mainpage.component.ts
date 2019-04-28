import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { ObservableLike } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})

export class MainpageComponent {

    userId:string = "userid";
    appointmentModel = new Appointment(this.userId, '', '', '', '', '');
    appointmentObject:Object;
    

    constructor(private data:DataService, private http:HttpClient){

    }

    onSubmit(){
      this.appointmentObject = {
        "userId": this.appointmentModel.userId,
        "fullName": this.appointmentModel.fullName,
        "email": this.appointmentModel.email,
        "date": this.appointmentModel.date,
        "time": this.appointmentModel.time,
        "message": this.appointmentModel.message,
        
      }
      // console.log(this.appointmentObject);
      // console.log(this.appointmentModel.fullName);
      this.data.addAppointment(this.appointmentObject).subscribe(data => {
          console.log(window.localStorage.getItem('appointment'));
          console.log(this.appointmentObject);
      });
    }

    
}
