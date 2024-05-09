import { Component,ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  isWebView: boolean = window.innerWidth > 758; // Assuming the cutoff for web view is 768 pixels

  showMoreClickedRecentlyAdded: boolean = false;
  showMoreClickedMostPopular: boolean = false;

  displayedRecentlyAddedBooks: any[] = [];
  displayedMostPopularBooks: any[] = [];

  initialBooksToShow: number = 3;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDisplayedBooks();
    this.isWebView = window.innerWidth > 758;
  }

  ngOnInit() {
    this.updateDisplayedBooks();
  }

  selectedBook: any;

  openModal(book: any) {
    this.selectedBook = book;
  }


  recentlyAddedBooks = [
    {
      title: 'The jigyasa Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 3,
      numberOfPeopleReviewed : 28
    },

    {
      title: 'The Invi',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 4,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 2,
      numberOfPeopleReviewed: 28
    },

  

  ];

  mostPopularBooks = [

    {
      title: 'The Invisible Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 4,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'The Invisible',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 3,
      numberOfPeopleReviewed: 28
    },

   

    {
      title: 'The Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 1,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 2,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'my',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 3,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'daryl',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 5,
      numberOfPeopleReviewed: 28
    },


    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 2,
      numberOfPeopleReviewed: 28
    },


    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 2,
      numberOfPeopleReviewed: 28
    },


    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 2,
      numberOfPeopleReviewed: 28
    },


  ];


  onShowMoreClicked(section: string) {
    if (section === 'recentlyAdded') {
      this.showMoreClickedRecentlyAdded = !this.showMoreClickedRecentlyAdded;
    } else if (section === 'mostPopular') {
      this.showMoreClickedMostPopular = !this.showMoreClickedMostPopular;
    }
  }

  updateDisplayedBooks() {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
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
    console.log(screenWidth);
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
    console.log(screenWidth);
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

}
