import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-reportform',
  templateUrl: './reportform.component.html',
  styleUrls: ['./reportform.component.scss']
})
export class ReportformComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReportformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closed(){
    this.dialogRef.close("Closed...!");
  }

}
