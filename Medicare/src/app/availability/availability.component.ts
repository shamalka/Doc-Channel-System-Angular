import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {

  doctors:Object;

  constructor(private data: DataService) { }

  ngOnInit() {
      this.getDoctor();
  }

  getDoctor(){
    this.data.getDoctors().subscribe((data:any) =>{
      this.doctors = data;
     // console.log(data);
      // console.log(this.userId);
    });
  }

}
