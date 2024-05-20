import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../shared/services/user-service.service';

@Component({
  selector: 'app-my-books-mobile',
  templateUrl: './my-books-mobile.component.html',
  styleUrls: ['./my-books-mobile.component.css']
})
export class MyBooksMobileComponent {

  myBooks: any = [];
  userId: any;
  constructor(private router: Router, private userservice: UserServiceService) {

  }

  routeTODasboard() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    // Assuming userId is initialized somewhere in your component
    this.userId ='26A2B9CB-8029-4CCC-AD63-E56893E631F0'; // Initialize with your actual userId
    this.getMyBooksMobile();
  }

  getMyBooksMobile() {
    this.userservice.getMyBooksMobile(this.userId).subscribe(
      (data) => {
        this.myBooks = data;
        console.log(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  searchTerm: string = '';

  searchBook() {
    // Filter myBooks array based on the search term
    if (this.searchTerm.trim() !== '') { // Check if searchTerm is not empty
      // Convert searchTerm to lowercase for case-insensitive search
      const searchTermLowerCase = this.searchTerm.toLowerCase();
      this.myBooks = this.myBooks.filter((book: { title: string; }) => {
        // Assuming 'title' is the property you want to filter by
        return book.title.toLowerCase().includes(searchTermLowerCase);
      });
    } else {
      // If searchTerm is empty, reset myBooks array to the original data
      this.getMyBooksMobile();
    }
  }
}
