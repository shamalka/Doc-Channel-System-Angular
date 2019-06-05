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
  animal: string = "dog";


  ReportData:object;

  constructor(private http: HttpClient, private data: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(){
    this.data.getDocPatients("Dr. Glen").subscribe(data => {
      this.patientModel = data;
      console.log(data);

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
