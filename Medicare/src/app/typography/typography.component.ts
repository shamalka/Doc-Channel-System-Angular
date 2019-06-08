import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ReportformComponent } from 'app/components/reportform/reportform.component';
import { ReportsComponent } from 'app/components/reports/reports.component';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  public patientModel = [];
  public reportsModel = [];
  animal: string = "dog";
  public isPatient:boolean;

  userId:string;
  docName:string;

  ReportData:object;

  constructor(private http: HttpClient, private data: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    if(this.data.isPatient()){
      this.userId = localStorage.getItem('userId');
      this.getReports();
      this.isPatient = true;
    }else{
      this.docName = localStorage.getItem('userName');
      this.userId = localStorage.getItem('userId');
      this.getPatients();
      this.isPatient = false;
    }
    
  }

  getReports(){
    this.data.getPatientReports(this.userId).subscribe(data => {
      this.reportsModel = data;
      console.log(data);

    })
  }

  getPatients(){
    this.data.getDocPatients(this.userId).subscribe(data => {
      this.patientModel = data;
      console.log(this.userId);

    })
  }

  openAddReportDialog(id:string, name:string, dob:string, gender:string): void {
    const dialogRef = this.dialog.open(ReportformComponent, {
      width: '500px',
      height: '500px',
      data: {id: id, name: name, dob: dob, gender: gender}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openAllReportsDialog(id:string): void {
    const dialogRef = this.dialog.open(ReportsComponent, {
      width: '800px',
      height: '500px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
