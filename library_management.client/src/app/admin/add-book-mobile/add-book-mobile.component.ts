import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book-mobile',
  templateUrl: './add-book-mobile.component.html',
  styleUrls: ['./add-book-mobile.component.css']
})
export class AddBookMobileComponent {

  //@Output() nextClicked: any = new EventEmitter<any>();
  constructor(private router: Router) { }

  stepperIndex: number = 0;
  Next() {
    this.stepperIndex = 1;
    //this.nextClicked.stepperIndex();
  }

  Back() {
    this.router.navigate(['/admin']);
  }

  Previous() {
    this.stepperIndex = 0;
  }

  Add() {

  }
}
