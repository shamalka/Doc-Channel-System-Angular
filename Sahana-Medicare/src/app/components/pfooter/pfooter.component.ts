import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pfooter',
  templateUrl: './pfooter.component.html',
  styleUrls: ['./pfooter.component.scss']
})
export class PfooterComponent implements OnInit {
  test: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
