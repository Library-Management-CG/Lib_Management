import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
import { UserServiceService } from '../../shared/services/user-service.service';

@Component({
  selector: 'app-add-book-mobile',
  templateUrl: './add-book-mobile.component.html',
  styleUrls: ['./add-book-mobile.component.css']
})
export class AddBookMobileComponent {

  addBook: any = {
    bookName: "",
    authorName: "",
    description: "",
    ISBN: "",
    img: ""
  }

  qrArr: any;

  //@Output() nextClicked: any = new EventEmitter<any>();
  constructor(private router: Router, private exploreService: ExploreBooksService, private urserService: UserServiceService) { }
  ngOnInit() {
    this.exploreService.addBookPage$.subscribe(idx => {
      this.stepperIndex = idx;
    });

    this.exploreService.book$.subscribe(arr => {
      this.addBook = arr;
      console.log("qwertyuiopoiuytrewq", arr);
    })

    this.exploreService.qrCodes$.subscribe(arr => {
      this.qrArr = arr;
    })
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

  Reset() {
    this.exploreService.resetBook();
  }

  Add() {

    console.log("add book post req", this.addBook);
    

    var book = {
      bookName: this.addBook.bookName,
      authorName: this.addBook.authorName,
      img: this.addBook.img,
      description: this.addBook.description,
      ISBN: this.addBook.ISBN,
      qty: this.qrArr.length,
      qr: this.qrArr,
      LoggedIn: '4EE28B71-DFAE-4BC9-8FE8-1579970A9560',
    }

    console.log("before we post", book);

    this.urserService.addNewBook(book).subscribe(
      (data: any[]) => {
        this.exploreService.settotalbooks(data);

        console.error('Error posted');

        this.Reset();
        this.exploreService.successIssue = false;

        this.router.navigate(['/admin/success-mobile']);
      },
      (error: any) => {
        console.error('Error posting:', error);
      }
    );
  }
}
