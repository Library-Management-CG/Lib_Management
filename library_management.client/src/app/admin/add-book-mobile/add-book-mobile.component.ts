import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';

@Component({
  selector: 'app-add-book-mobile',
  templateUrl: './add-book-mobile.component.html',
  styleUrls: ['./add-book-mobile.component.css']
})
export class AddBookMobileComponent {

  //@Output() nextClicked: any = new EventEmitter<any>();
  constructor(private router: Router, private exploreService: ExploreBooksService) { }
  ngOnInit() {
    this.exploreService.addBookPage$.subscribe(idx => {
      this.stepperIndex = idx;
    });
  }

  stepperIndex: number = 0;
  Next() {
    this.stepperIndex = 1;
    this.exploreService.setaddBookPage(this.stepperIndex);
    console.log(this.stepperIndex);
    //this.nextClicked.stepperIndex();
  }

  Back() {
    this.router.navigate(['/admin']);
  }

  Previous() {
    this.stepperIndex = 0;
    this.exploreService.setaddBookPage(this.stepperIndex);
    console.log(this.stepperIndex);
  }

  Add() {

  }
}
