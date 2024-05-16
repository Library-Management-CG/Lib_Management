import { Component,ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserServiceService } from '../../shared/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  topUsers: any[] | undefined;
  isWebView: boolean = window.innerWidth > 758; // Assuming the cutoff for web view is 768 pixels

  showMoreClickedRecentlyAdded: boolean = false;
  showMoreClickedMostPopular: boolean = false;

  displayedRecentlyAddedBooks: any[] = [];
  displayedMostPopularBooks: any[] = [];

  recentlyAddedBooks: any[] = [];
  mostPopularBooks: any[] = [];

  initialBooksToShow: number = 3;
  constructor(private router: Router, private userService: UserServiceService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDisplayedBooks();
    this.isWebView = window.innerWidth > 758;
  }

  ngOnInit() {
    this.getRecentBooks();
    this.getMostPopularBooks();
    this.updateDisplayedBooks();
    this.getTopReaders();
  }

  selectedBook: any;

  openModal(book: any) {
    this.selectedBook = book;
  }

  getRecentBooks(): void {
    this.userService.getRecentBooks()
      .subscribe(
        (data: any) => {
          this.recentlyAddedBooks = data;
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
  }

  getMostPopularBooks(): void {
    this.userService.getMostPopularBooks()
      .subscribe(
        (data: any) => {
          this.mostPopularBooks = data;
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
  }

  getTopReaders(): void {
    this.userService.getTopReaders()
      .subscribe(
        (data: any) => {
          this.topUsers = data;
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
  }


  onShowMoreClicked(section: string) {
    if (section === 'recentlyAdded') {
      this.showMoreClickedRecentlyAdded = !this.showMoreClickedRecentlyAdded;
    } else if (section === 'mostPopular') {
      this.showMoreClickedMostPopular = !this.showMoreClickedMostPopular;
    }
  }

  updateDisplayedBooks() {
    const screenWidth = window.innerWidth;
    //console.log(screenWidth);
    if (screenWidth <= 758) {
      this.initialBooksToShow = 2;
    } else {
      this.initialBooksToShow = 3;
    }

    this.displayedRecentlyAddedBooks = this.showMoreClickedRecentlyAdded ? this.recentlyAddedBooks : this.recentlyAddedBooks.slice(0, this.initialBooksToShow);
    this.displayedMostPopularBooks = this.showMoreClickedMostPopular ? this.mostPopularBooks : this.mostPopularBooks.slice(0, this.initialBooksToShow);
  }

  get booksToRecentDisplay(): any[] {
    const screenWidth = window.innerWidth;
    //console.log(screenWidth);
    if (screenWidth <= 758) {
      this.initialBooksToShow = 2;
    } else {
      this.initialBooksToShow = 3;
    }

    this.displayedRecentlyAddedBooks = this.showMoreClickedRecentlyAdded ? this.recentlyAddedBooks : this.recentlyAddedBooks.slice(0, this.initialBooksToShow);
    return this.displayedRecentlyAddedBooks;
  }

  get booksToPopularDisplay(): any[] {
    const screenWidth = window.innerWidth;
    //console.log(screenWidth);
    if (screenWidth <= 758) {
      this.initialBooksToShow = 2;
    } else {
      this.initialBooksToShow = 3;
    }

    this.displayedMostPopularBooks = this.showMoreClickedMostPopular ? this.mostPopularBooks : this.mostPopularBooks.slice(0, this.initialBooksToShow);
    return this.displayedMostPopularBooks;
  }

  get showMoreButtonVisibleRecentlyAdded(): boolean {
    const screenWidth = window.innerWidth;
    const maxBooksToShow = screenWidth <= 758 ? 2 : 3;
    return this.recentlyAddedBooks.length > maxBooksToShow;
  }

  get showMoreButtonVisibleMostPopular(): boolean {
    const screenWidth = window.innerWidth;
    const maxBooksToShow = screenWidth <= 758 ? 2 : 3;
    return this.mostPopularBooks.length > maxBooksToShow;
  }

  exploreBooks() {
    this.router.navigate(['explore-books']);
  }
}
