import { Component, OnInit } from '@angular/core';
import { Drug } from 'app/models/drug';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  drugModel = new Drug('','','',)
  drugObject:object;

  constructor(private data:DataService, private http:HttpClient, private router:Router) { }

  ngOnInit() {
    this.getDrugs();
  }

  getDrugs(){
      this.data.getDrugs().subscribe((res:any) => {
          this.drugModel = res;
      })
  }

  addDrug(){
      this.drugObject = {
          "drugName": this.drugModel.drugName,
          "price": this.drugModel.price,
          "quantity": this.drugModel.quantity
      }
      this.data.AddDrug(this.drugObject).subscribe((res:any) => {
        console.log(res);
        window.location.reload();
      })
  }

}
