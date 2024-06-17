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
  filterValue: string = '';

  filteredexploreBooks: any[]

  dataLoaded = false;

  exploreBooks: any[] = [];
  selectedBook: any;
  availablebooks = []
  ratingFilteredBook: any[] = [];
  selectedRatings: number[] = [];
  availableBooksOfRatingFilter: any[] = [];

  constructor(private router: Router, private user: UserServiceService, private exploreBooksService: ExploreBooksService) {
    this.filteredexploreBooks = this.exploreBooks;

  };
  isChecked: boolean = false;


  ngOnInit(): void {

    this.exploreBookData();
    this.exploreBooksService.getFilterValue().subscribe(filterValue => {
      //console.log('Filter Value:', filterValue);
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
    //console.log('where', this.selectedRatings);
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
        this.filteredexploreBooks = this.exploreBooks;
        this.checkDataLoaded();

        //console.log(data);

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

        //console.log(data);

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

      //  console.log('Filtered books:', this.ratingFilteredBook);
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

  applyBookFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.exploreBooksService.setFilterValue(this.filterValue);
   
  }

  checkDataLoaded() {
    if (this.exploreBooks.length > 0) {
      this.dataLoaded = true;
    }
  }



}
