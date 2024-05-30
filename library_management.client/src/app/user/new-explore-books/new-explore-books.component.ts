import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../shared/services/user-service.service';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';

@Component({
  selector: 'app-new-explore-books',
  templateUrl: './new-explore-books.component.html',
  styleUrls: ['./new-explore-books.component.css']
})
export class NewExploreBooksComponent {

  exploreBooks = [];
  selectedBook: any;
  availablebooks = []
  ratingFilteredBook: any[] = [];
  selectedRatings: number[] = [];
  availableBooksOfRatingFilter: any[] = [];

  constructor(private router: Router, private user: UserServiceService, private exploreBooksService: ExploreBooksService) { };
  isChecked: boolean = false;


  ngOnInit(): void {

    this.exploreBookData();
    this.exploreBooksService.getFilterValue().subscribe(filterValue => {
      console.log('Filter Value:', filterValue);
      if (filterValue) {
        this.filterExploreBooks(filterValue);
      } else {
        // Reset the filter or apply a default filter logic
        this.exploreBookData(); // For example, reload all explore books
      }
    });

   
  }
  onSelectedValuesChange(selectedValues: number[]): void {
    this.selectedRatings = selectedValues;
    this.getFilteredBooks();
  }
  filterAvailableBooksOfRatingFilter(): void {
    this.availableBooksOfRatingFilter = this.ratingFilteredBook.filter(book => book.statusName === 'Available');
    
  }
  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.availableBookData();
    }
    if (this.isChecked && this.selectedRatings.length > 0) {
      this.filterAvailableBooksOfRatingFilter();
    }
  }
  redirect_back() {
    this.redirectToUserDashboard();
  }
  redirectToUserDashboard() {
    this.router.navigate(['']);
  }

  openModaldesc(book: any) {
    this.selectedBook = book;
  }

  exploreBookData() {
    this.user.explorebooks().subscribe(
      (data) => {
        this.exploreBooks = data;
        console.log(data);

      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }

  availableBookData() {
    this.user.availableExplore().subscribe(
      (data) => {
        this.availablebooks = data;
        console.log(data);

      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }
  getFilteredBooks(): void {
    this.user.getRatingFilteredBooks(this.selectedRatings).subscribe(
      data => {
        this.ratingFilteredBook = data;
        console.log('Filtered books:', this.ratingFilteredBook);
      },
      error => {
        console.error('Error fetching filtered books:', error);
      }
    );
  }

  filterExploreBooks(filterValue: string): void {

    this.exploreBooks = this.exploreBooks.filter(book => {
      return book.title.toLowerCase().includes(filterValue.toLowerCase());
    });
  }



}
