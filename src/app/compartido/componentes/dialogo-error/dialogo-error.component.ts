import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-error',
  templateUrl: './dialogo-error.component.html',
  styleUrls: ['./dialogo-error.component.scss']
})
export class DialogoErrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dato: string) {

  }

  ngOnInit(): void {
  }

}
