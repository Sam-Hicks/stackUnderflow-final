import { Component, OnInit, Inject } from '@angular/core';
import { DATASET } from '../../mock-data';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  showFiller = false;
  dataset = DATASET;
 

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;

        this.dialog.open(DialogBox, dialogConfig);
  }

}

@Component({
  selector: 'dialog-box',
  templateUrl: 'dialog-box.html'
})
export class DialogBox {

  constructor(@Inject(MAT_DIALOG_DATA) public data: HomePageComponent) {}
}
