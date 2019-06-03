import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/services/data.service';
import { Observable } from 'rxjs';
import { Appointment } from 'app/models/appointment';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  //appointmentModel:any; 

  public appointmentModel = [];

  constructor(private http: HttpClient, private data: DataService) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(){
    this.data.getDocAppointments("Dr. Glen").subscribe(data => {
      this.appointmentModel = data;
    })
  }

}
