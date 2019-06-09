import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Appointment } from 'app/models/appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  userId:string = localStorage.getItem('userId');
  appointmentModel = new Appointment('', '', '', '', '','','','pending','');
  appointmentObject:Object;

  userName: string;
  doctors:Object;

  date:Date;

  docPatientCount:any;
  docPatientLimit:any;
  doctor_name:string;

  constructor(public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any, private router:Router,private data:DataService, private http:HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Set Username
    if(localStorage.getItem('token')!=null){
      this.userName = localStorage.getItem('userName');
      console.log(this.userName);
    }

    this.getDoctors();
  }

  onSubmit(){
  
  //  var appDate = this.appointmentModel.date.split('T', 2)[0];
    this.appointmentObject = {
      "userId": this.userId,
      "fullName": this.userName,
      "email": this.appointmentModel.email,
      "date": this.appointmentModel.date,
      "time": this.appointmentModel.time,
      "doctor": this.doctor_name,
      "message": this.appointmentModel.message,
      "status": 'pending'
    }
    // console.log(this.appointmentObject);
    // console.log(this.appointmentModel.fullName);
    //console.log(this.appointmentModel.doctor);
    //this.getAppointmentsForDoc(this.appointmentModel.doctor);

    console.log(this.docPatientCount + " : " + this.docPatientLimit)

    if(parseInt(this.docPatientCount)>=parseInt(this.docPatientLimit)){
      console.log("Limit exceeded..");
      this.openSnackBar("Sorry, Doctor's Patient limit is full", "Close");
    }else{
      console.log("not exceeded..");
      console.log(this.appointmentObject);
      this.data.addAppointment(this.appointmentObject).subscribe((data:any) => {
        console.log(window.localStorage.getItem('appointment'));
        console.log(this.appointmentObject);
        
        this.dialogRef.close();
        this.router.navigate(['/dashboard']);
      },(err:HttpErrorResponse)=>{
        console.log(err.error);
      });
    }

    

    
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

  goToAppointment(){
    if(this.data.isLoggedin()==false){
      this.router.navigate(['/']);
    }
  }

  getDoctors(){
    this.data.getDoctors().subscribe(data =>{
      this.doctors = data;
      console.log(data[0]);
      // console.log(this.userId);
    });
  }


  getAppointmentsForDoc(docName:string){
    this.data.getDocAppointments(docName).subscribe((data:any) => {
      this.appointmentModel = data;
      
      this.docPatientCount = data.length;
      console.log("count: " + this.docPatientCount);
    })
  }

  getPatientCount(docName:string,patientCount:any){
    console.log(patientCount);
    this.docPatientLimit = patientCount;
    this.doctor_name = docName;
    this.getAppointmentsForDoc(docName);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
