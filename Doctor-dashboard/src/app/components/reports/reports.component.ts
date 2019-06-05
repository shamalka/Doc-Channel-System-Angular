import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public reportsModel = [];

  constructor(public dialogRef: MatDialogRef<ReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService, private http:HttpClient) { }

  ngOnInit() {
    this.getReports();
  }

  getReports(){
      this.dataService.getPatientReports(this.data.id, 'doc_id').subscribe(dataService => {
      this.reportsModel = dataService;
      console.log(dataService);
    })
  }

}
