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
  dataLoaded = false;
  filteredBooks_skeleton: any[]=[1];
  filteredBooks_skeleton_2: any[]=[1,2];
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
    this.userId ='2AC8C146-3276-46FB-8298-40B7A82723F3'; // Initialize with your actual userId
    this.getMyBooksMobile();
  }

  getMyBooksMobile() {
    this.userservice.getMyBooksMobile(this.userId).subscribe(
      (data) => {
        this.myBooks = data;
        this.filteredBooks = this.myBooks;
        this.checkDataLoaded();

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

  checkDataLoaded() {
    if (this.filteredBooks.length>0) {
      this.dataLoaded = true;
    }
  }


 
}
