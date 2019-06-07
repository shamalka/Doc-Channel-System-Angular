import { Component, OnInit } from '@angular/core';
import { Appointment } from 'app/models/appointment';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  appointmentModel = new Appointment('asdas', '', '', '', '', '','','','');
  appointmentObject:Object;

  constructor() { }

  ngOnInit() {
  }

}
