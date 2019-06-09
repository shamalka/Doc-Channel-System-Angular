import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';
import { Appointment } from 'app/models/appointment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  //appointmentModel:any; 

  public appointmentModel = [];
  docName:string;
  public userId:string;

  isPatient:boolean;

  constructor(private http: HttpClient, private data: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.docName = localStorage.getItem('userName');
    this.userId = localStorage.getItem('userId');
    
    if(this.data.isPatient()){
      this.getAppointmentsForPatient();
      console.log(this.userId);
      this.isPatient=true;
    }else{
      this.getAppointmentsForDoc();
      this.isPatient=false;
    }
  }
  
  getAppointmentsForPatient(){
    this.data.getPatientAppointments(this.userId).subscribe((data:any) => {
      this.appointmentModel = data;
    })
  }

  getAppointmentsForDoc(){
    this.data.getDocAppointments(this.docName).subscribe((data:any) => {
      this.appointmentModel = data;
    })
  }

  setStatus(appointmentId:string, status:string, patientId:string){
    this.data.setAppointmentStatus(appointmentId, status).subscribe((res:any) => {
      console.log(res);
      this.openSnackBar("Appointment " + status, 'close');
      window.location.reload();
    });
    if(status=='accepted'){
      this.setDoctorToPatient(patientId, this.userId);
    }else if(status == 'rejected'){
      this.removeDocFromPatient(patientId);
    }
  }

  setDoctorToPatient(patientId:string, doctorId:string){
    this.data.setDoctorToPatient(patientId, doctorId).subscribe((res:any) => {
      console.log(res);
    })
  }

  removeDocFromPatient(patientId:string){
    this.data.removeDocFromPatient(patientId).subscribe((res:any) => {
      console.log(res);
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cancelAppointment(appointmentId:string){
    var sure = confirm("Are you sure?");
    if(sure == true){
      this.data.removeAppointment(appointmentId).subscribe((res:any) => {
        console.log(res);
        window.location.reload();
      });
    }else{
      console.log('canceled.!');
    }
    
  }

}
