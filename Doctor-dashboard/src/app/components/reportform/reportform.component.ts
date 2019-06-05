import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Report } from 'app/models/report';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-reportform',
  templateUrl: './reportform.component.html',
  styleUrls: ['./reportform.component.scss']
})
export class ReportformComponent implements OnInit {

  

  constructor(public dialogRef: MatDialogRef<ReportformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router:Router,private servicedata:DataService, private http:HttpClient) { }

  ngOnInit() {
  }

  closed(){
    this.dialogRef.close("Closed...!");
  }

  reportModel = new Report('doc_id',this.data.id,this.data.name,this.data.dob,this.data.gender,'','','');
  reportObject:object;

  AddReport(){
    this.reportObject={
      "doctorId": this.reportModel.doctorId,
      "patientId": this.reportModel.patientId,
      "patientName": this.reportModel.patientName,
      "dob": this.reportModel.dob,
      "gender": this.reportModel.gender,
      "description": this.reportModel.description,
      "prescription": this.reportModel.prescription,
      "nextDate": this.reportModel.nextDate
    }

    this.servicedata.AddReport(this.reportObject).subscribe(servicedata => {
    //  console.log(window.localStorage.getItem('appointment'));
      console.log(this.reportObject);
      this.dialogRef.close();
    },(err:HttpErrorResponse)=>{
      console.log(err.error);
    });
  }

}
