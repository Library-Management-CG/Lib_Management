import { Component, ViewChild, AfterViewInit, Input, SimpleChanges, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Element {
  bookName: string;
  author: string;
  copies: number;
  expanded: boolean;
  bookData: BookData[];
}

export interface BookData {
  qrNumber: string;
  issuedTo: string;
  issueDate: Date;
  returnDate: Date;
  status: string;
}

const ELEMENT_DATA: Element[] = [
  {
    bookName: 'To Kill a Mocking bird',
    author: 'Harper Lee',
    copies: 2,
    expanded: true,
    bookData: [
      {
        qrNumber: 'QR1234',
        issuedTo: 'John Doe',
        issueDate: new Date(2023, 3, 1), // April 1, 2023
        returnDate: new Date(2023, 4, 1), // May 1, 2023
        status: 'Submitted'
      },
      {
        qrNumber: 'QR1235',
        issuedTo: 'Stephen Kyllo',
        issueDate: new Date(2023, 3, 1), // April 1, 2023
        returnDate: new Date(2023, 4, 1), // May 1, 2023
        status: 'Reading'
      }
    ]
  },
  {
    bookName: '1984',
    author: 'George Orwell',
    copies: 3,
    expanded: false,
    bookData: [
      {
        qrNumber: 'QR1235',
        issuedTo: 'Jane Smith',
        issueDate: new Date(2023, 3, 5), // April 5, 2023
        returnDate: new Date(2023, 4, 5), // May 5, 2023
        status: 'Returned'
      }
    ]
  },
  // Continue filling out other books similarly...
  {
    bookName: 'Pride and Prejudice',
    author: 'Jane Austen',
    copies: 4,
    expanded: false,
    bookData: [] // Assume no records yet
  },
  {
    bookName: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    copies: 2,
    expanded: false,
    bookData: [] // Assume no records yet
  },
  {
    bookName: 'Great Expectations',
    author: 'Charles Dickens',
    copies: 6,
    expanded: false,
    bookData: [] // Assume no records yet
  }
  // Add more data for each book as needed...
];


//const ELEMENT_DATA: Element[] = [
//  { bookName: 'To Kill a Mockingbird', author: 'Harper Lee', copies: 5, expanded: false },
//  { bookName: '1984', author: 'George Orwell', copies: 3, expanded: false },
//  { bookName: 'Pride and Prejudice', author: 'Jane Austen', copies: 4, expanded: false },
//  { bookName: 'The Great Gatsby', author: 'F. Scott Fitzgerald', copies: 2, expanded: false },
//  { bookName: 'Great Expectations', author: 'Charles Dickens', copies: 6, expanded: false },
//  { bookName: 'War and Peace', author: 'Leo Tolstoy', copies: 5, expanded: false },
//  { bookName: 'Hamlet', author: 'William Shakespeare', copies: 4, expanded: false },
//  { bookName: 'The Catcher in the Rye', author: 'J.D. Salinger', copies: 5, expanded: false },
//  { bookName: 'The Hobbit', author: 'J.R.R. Tolkien', copies: 7, expanded: false },
//  { bookName: 'Fahrenheit 451', author: 'Ray Bradbury', copies: 3, expanded: false },
//  { bookName: 'Brave New World', author: 'Aldous Huxley', copies: 4, expanded: false },
//  { bookName: 'The Odyssey', author: 'Homer', copies: 6, expanded: false },
//  { bookName: 'Madame Bovary', author: 'Gustave Flaubert', copies: 2, expanded: false },
//  { bookName: 'Anna Karenina', author: 'Leo Tolstoy', copies: 5, expanded: false },
//  { bookName: 'The Divine Comedy', author: 'Dante Alighieri', copies: 3, expanded: false },
//  { bookName: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', copies: 4, expanded: false },
//  { bookName: 'Ulysses', author: 'James Joyce', copies: 2, expanded: false },
//  { bookName: 'Lolita', author: 'Vladimir Nabokov', copies: 6, expanded: false },
//  { bookName: 'Crime and Punishment', author: 'Fyodor Dostoevsky', copies: 4, expanded: false },
//  { bookName: 'The Trial', author: 'Franz Kafka', copies: 3, expanded: false }
//];



@Component({
  selector: 'app-outer-table',
  templateUrl: './outer-table.component.html',
  styleUrls: ['./outer-table.component.css']
})
export class OuterTableComponent {

  @Input() filterValue: string = '';

  console = console;
  displayedColumns = ['bookName', 'author', 'copies'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  isNormalRow(index : any, row: any) { console.log(row); return !row.expanded; }
  isExpandedRow(index: any, row: any) { return row.expanded; }
  pageEvent !: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild('paginatorLabel', { static: false }) paginatorLabel !: ElementRef;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterValue']) {
      const filterValue = changes['filterValue'].currentValue || '';
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  allExpanded() {
    return this.dataSource.data.every(el => el.expanded);
  }

  expandAll() {
    for (const el of this.dataSource.data) { el.expanded = true; }
  }

  allCollapsed() {
    return this.dataSource.data.every(el => !el.expanded);
  }

  collapseAll() {
    for (const el of this.dataSource.data) { el.expanded = false; }
  }
}
