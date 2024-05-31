import { Component, ViewChild, AfterViewInit, Input, SimpleChanges, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageBooksService } from '../../../shared/services/manage-books.service';
import { UserServiceService } from '../../../shared/services/user-service.service';

interface Element {
  bookName: string;
  author: string;
  qrNumber: string;
  dateOfIssue: string;
  dateOfReturn: string;
  rating: number;
  status: string;
}


const ELEMENT_DATA: Element[] = [
  {
    bookName: 'To Kill a Mocking bird',
    author: 'Harper Lee',
    qrNumber: 'QR123456',
    dateOfIssue: '2023-01-01',
    dateOfReturn: '2023-01-15',
    rating: 4,
    status: 'Available',
  },
  {
    bookName: '1984',
    author: 'George Orwell',
    qrNumber: 'QR123457',
    dateOfIssue: '2023-02-01',
    dateOfReturn: '2023-02-15',
    rating: 4,
    status: 'Issued',
  },
  {
    bookName: 'Pride and Prejudice',
    author: 'Jane Austen',
    qrNumber: 'QR123458',
    dateOfIssue: '2023-01-01',
    dateOfReturn: '2023-01-15',
    rating: 4,
    status: 'Available',
  },
  {
    bookName: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    qrNumber: 'QR123459',
    dateOfIssue: '2023-03-01',
    dateOfReturn: '2023-03-15',
    rating: 4,
    status: 'Issued',
  },
  {
    bookName: 'Great Expectations',
    author: 'Charles Dickens',
    qrNumber: 'QR123460',
    dateOfIssue: '2023-01-01',
    dateOfReturn: '2023-01-15',
    rating: 4.5,
    status: 'Available',
  },
  {
    bookName: 'To Kill a Mocking bird',
    author: 'Harper Lee',
    qrNumber: 'QR123461',
    dateOfIssue: '2023-04-01',
    dateOfReturn: '2023-04-15',
    rating: 4,
    status: 'Available',
  },
  {
    bookName: '1984',
    author: 'George Orwell',
    qrNumber: 'QR123462',
    dateOfIssue: '2023-05-01',
    dateOfReturn: '2023-05-15',
    rating: 4,
    status: 'Issued',
  },
  {
    bookName: 'Pride and Prejudice',
    author: 'Jane Austen',
    qrNumber: 'QR123463',
    dateOfIssue: '2023-01-01',
    dateOfReturn: '2023-01-15',
    rating: 4,
    status: 'Available',
  },
  {
    bookName: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    qrNumber: 'QR123464',
    dateOfIssue: '2023-06-01',
    dateOfReturn: '2023-06-15',
    rating: 4,
    status: 'Issued',
  },
  {
    bookName: 'Great Expectations',
    author: 'Charles Dickens',
    qrNumber: 'QR123465',
    dateOfIssue: '2023-01-01',
    dateOfReturn: '2023-01-15',
    rating: 4,
    status: 'Available',
  },
  {
    bookName: 'To Kill a Mocking bird',
    author: 'Harper Lee',
    qrNumber: 'QR123466',
    dateOfIssue: '2023-07-01',
    dateOfReturn: '2023-07-15',
    rating: 4.8,
    status: 'Available',
  },
  {
    bookName: '1984',
    author: 'George Orwell',
    qrNumber: 'QR123467',
    dateOfIssue: '2023-08-01',
    dateOfReturn: '2023-08-15',
    rating: 4,
    status: 'Issued',
  },
  {
    bookName: 'Pride and Prejudice',
    author: 'Jane Austen',
    qrNumber: 'QR123468',
    dateOfIssue: '2023-01-01',
    dateOfReturn: '2023-01-15',
    rating: 4,
    status: 'Available',
  },
  {
    bookName: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    qrNumber: 'QR123469',
    dateOfIssue: '2023-09-01',
    dateOfReturn: '2023-09-15',
    rating: 4,
    status: 'Issued',
  },
  {
    bookName: 'Great Expectations',
    author: 'Charles Dickens',
    qrNumber: 'QR123470',
    dateOfIssue: '2023-01-01',
    dateOfReturn: '2023-01-15',
    rating: 4,
    status: 'Available',
  },
];


@Component({
  selector: 'app-my-books-table',
  templateUrl: './my-books-table.component.html',
  styleUrls: ['./my-books-table.component.css']
})
export class MyBooksTableComponent {
  constructor(private userservice: UserServiceService) { }

  /* @Input() filterValue: string = '';*/
  userId: any;
  stars: boolean[] = [];

  displayedColumns = ['bookName', 'author', 'qrNumber', 'dateOfIssue', 'dateOfReturn', 'rating', 'status'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  
  pageEvent !: PageEvent;
  currentPageSize: number = this.dataSource.paginator?.pageSize == null ? 0 : this.dataSource.paginator?.pageSize;


  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild('paginatorLabel', { static: false }) paginatorLabel !: ElementRef;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.userId = 'DCE3ECF5-87DA-423E-A0DC-430CE370BB98'; // Initialize with your actual userId
    this.fetchDataFromApi();
  }

  getStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < rating);
  }

  //ngOnChanges(changes: SimpleChanges) {
  //  if (changes['filterValue']) {
  //    const filterValue = changes['filterValue'].currentValue || '';
  //    this.dataSource.filter = filterValue.trim().toLowerCase();
  //  }
  //}

  fetchDataFromApi() {
    this.userservice.getMyBooksMobile(this.userId).subscribe(
      (data) => {
        console.log('hello : ',data);
      },
      (error) => {
        console.error('Error:', error);
      });
  }

  //transformData(apiData: any[]): Element[] {
  //  return apiData.map(book => ({
  //    bookName: book.title,
  //    author: book.authorNames,
  //    copies: book.numberOfCopies,
  //    expanded: false,
  //    bookData: book.bookQrDetails.map((detail: any) => ({
  //      qrNumber: detail.qrNumber,
  //      issuedTo: detail.issuedTo,
  //      issueDate: detail.issueDate ? new Date(detail.issueDate) : null,
  //      returnDate: detail.returnDate ? new Date(detail.returnDate) : null,
  //      status: detail.status
  //    }))
  //  }));
  //}

}
