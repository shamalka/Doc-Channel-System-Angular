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

export class MainpageComponent implements OnInit {

    userId:string = localStorage.getItem('userId');
    appointmentModel = new Appointment(this.userId, '', '', '', '', '');
    appointmentObject:Object;
    
    userName: string;

    constructor(private data:DataService, private http:HttpClient){

    }

    ngOnInit() {
      //Set Username
      if(localStorage.getItem('token')!=null){
        this.userName = localStorage.getItem('userName');
        console.log(this.userName);
      }
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

    isLogged(){
      this.data.isLoggedin();
      if(this.data.isLoggedin()){
        console.log("Logged In");
      }else{
        console.log("not logged in");
      }
    }

    Logout(){
      this.data.logoutUser();
    }

    
}
