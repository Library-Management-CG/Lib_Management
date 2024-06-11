import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../shared/services/user-service.service';

@Component({
  selector: 'app-my-books-mobile',
  templateUrl: './my-books-mobile.component.html',
  styleUrls: ['./my-books-mobile.component.css']
})
export class MyBooksMobileComponent {
  filteredBooks: any[]
  filterValue: string = '';

  myBooks: any = [];
  userId: any;
  constructor(private router: Router, private userservice: UserServiceService) {
    this.filteredBooks = this.myBooks;
  }


  applyBookFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filteredBooks = this.myBooks.filter((book: { bookName: string; }) =>
      book.bookName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
 }

  routeTODasboard() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    // Assuming userId is initialized somewhere in your component
    this.userId ='4EE28B71-DFAE-4BC9-8FE8-1579970A9560'; // Initialize with your actual userId
    this.getMyBooksMobile();
  }

  getMyBooksMobile() {
    this.userservice.getMyBooksMobile(this.userId).subscribe(
      (data) => {
        this.myBooks = data;
        this.filteredBooks = this.myBooks;

        //console.log(this.myBooks);
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  hasBooksWithReturnDate(): boolean {
    const books = this.filteredBooks && this.filteredBooks.length ? this.filteredBooks : this.myBooks;
    return books.some((book: { returnDate: null; }) => book.returnDate !== null);
  }

  hasBookWithReturn(): boolean {
    const books = this.filteredBooks && this.filteredBooks.length ? this.filteredBooks : this.myBooks;
    return books.some((book: { returnDate: null; }) => book.returnDate == null);
  }



 
}
