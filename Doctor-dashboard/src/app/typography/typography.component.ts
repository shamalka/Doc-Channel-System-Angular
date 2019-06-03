import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ReportformComponent } from 'app/components/reportform/reportform.component';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  public patientModel = [];
  animal: string = "dog";
  name: string;

  ReportData:object;

  constructor(private http: HttpClient, private data: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(){
    this.data.getDocPatients("Select Later").subscribe(data => {
      this.patientModel = data;
      this.name = data[0].fullName;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReportformComponent, {
      width: '500px',
      height: '500px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
