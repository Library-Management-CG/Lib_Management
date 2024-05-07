import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-book-cards',
  templateUrl: './book-cards.component.html',
  styleUrls: ['./book-cards.component.css']
})
export class BookCardsComponent {
  @Input() showMoreClicked: boolean = false;
  @Input() books: any[] = [];

  displayedBooks: any[] = [];
  initialBooksToShow: number = 5; 

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDisplayedBooks();
  }

  ngOnInit() {
    this.updateDisplayedBooks();
  }

  updateDisplayedBooks() {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
    if (screenWidth <= 768) {
      this.initialBooksToShow = 2;
    } else {
      this.initialBooksToShow = 3;
    }

    this.displayedBooks = this.showMoreClicked ? this.books : this.books.slice(0, this.initialBooksToShow);
  }

 

  get booksToDisplay(): any[] {
    const screenWidth = window.innerWidth;
    console.log(screenWidth);
    if (screenWidth <= 768) {
      this.initialBooksToShow = 2;
    } else {
      this.initialBooksToShow = 3;
    }

    this.displayedBooks = this.showMoreClicked ? this.books : this.books.slice(0, this.initialBooksToShow);
    return this.displayedBooks;
  }

}
