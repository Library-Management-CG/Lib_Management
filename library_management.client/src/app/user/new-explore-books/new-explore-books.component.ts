import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../shared/services/user-service.service';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
declare var $: any;

@Component({
  selector: 'app-new-explore-books',
  templateUrl: './new-explore-books.component.html',
  styleUrls: ['./new-explore-books.component.css']
})
export class NewExploreBooksComponent {
  filterValue: string = '';
  infinite: boolean = false;
  filteredexploreBooks: any[] = [];

  stopInfinite: boolean = true;

  dataLoaded = false;

  exploreBooks: any[] = [];
  selectedBook: any;
  availablebooks = []
  ratingFilteredBook: any[] = [];
  selectedRatings: number[] = [];
  availableBooksOfRatingFilter: any[] = [];

  pageNumber: number = 1;

  constructor(private router: Router, private user: UserServiceService, private exploreBooksService: ExploreBooksService) {
    this.filteredexploreBooks = this.exploreBooks;

  };
  loading: boolean = false;
  isChecked: boolean = false;


  ngOnInit(): void {
    this.pageNumber = 1;
    //this.exploreBookData();
    this.exploreBooksService.getFilterValue().subscribe(filterValue => {
      //console.log('Filter Value:', filterValue);
      if (filterValue) {
        this.filterExploreBooks(filterValue);
      } else {
        this.exploreBookData(); 
      }
    });

   
  }



  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.shouldLoadData() && !this.loading && this.stopInfinite) {
      //setTimeout(() => {
        this.infinite = true;
      //}, 1000)
      //setTimeout(() => {
      //  this.infinite = false;
      //},2000)
      
      this.pageNumber++;
      this.loading = true;
      //console.log(this.pageNumber);
       this.exploreBookData();
    }
  }

  private shouldLoadData(): boolean {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    //if (this.infinite) {
    //  return scrollPosition + windowHeight >= documentHeight+200;
    //}
    return scrollPosition + windowHeight >= documentHeight-10;
  }

  exploreBookData() {

    const pageDetails = {
      pageNumber: this.pageNumber,
      pageSize: parseInt('10', 10)
    }

    this.user.explorebooks(pageDetails).subscribe(
      (data) => {
        if (data.length == 0) {
          console.log(data);
          this.stopInfinite = false;
        }
        this.infinite = false;
        this.exploreBooks = this.exploreBooks.concat(data);
        this.filteredexploreBooks = this.filteredexploreBooks.concat(this.exploreBooks);
        this.checkDataLoaded();
        this.loading = false;
        //console.log(data);
      },
      (error) => {
        this.loading = false;
        console.error('Error:', error);
      }
    );

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
