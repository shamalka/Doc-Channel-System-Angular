import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})

export class MainpageComponent {

    appointmentModel = new Appointment('John', 'John@gmail.com', '2019/04/27', '6:16PM', 'My message');
}
