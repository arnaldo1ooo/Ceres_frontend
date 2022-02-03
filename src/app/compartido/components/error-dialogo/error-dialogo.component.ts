import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialogo',
  templateUrl: './error-dialogo.component.html',
  styleUrls: ['./error-dialogo.component.scss']
})
export class ErrorDialogoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {
  }
}
