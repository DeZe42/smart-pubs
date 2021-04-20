import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-informational-dialog',
  templateUrl: './informational-dialog.component.html',
  styleUrls: ['./informational-dialog.component.scss']
})
export class InformationalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InformationalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit(): void {
  }
}