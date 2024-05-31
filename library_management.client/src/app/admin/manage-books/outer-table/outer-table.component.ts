import { Component, ViewChild, AfterViewInit, Input, SimpleChanges, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageBooksService } from '../../../shared/services/manage-books.service';

export interface Element {
  bookName: string;
  author: string;
  copies: number;
  expanded: boolean;
  bookData: BookData[];
}

export interface BookData {
  bookQrMappingId: any;
  qrNumber: string;
  issuedTo: string;
  issueDate: Date;
  returnDate: Date;
  status: string;
}

//const ELEMENT_DATA: Element[] = [
//  {
//    bookName: 'To Kill a Mocking bird',
//    author: 'Harper Lee',
//    copies: 2,
//    expanded: true,
//    bookData: [
//      {
//        qrNumber: 'QR1234',
//        issuedTo: 'John Doe',
//        issueDate: new Date(2023, 3, 1), // April 1, 2023
//        returnDate: new Date(2023, 4, 1), // May 1, 2023
//        status: 'Submitted'
//      },
//      {
//        qrNumber: 'QR1235',
//        issuedTo: 'Stephen Kyllo',
//        issueDate: new Date(2023, 3, 1), // April 1, 2023
//        returnDate: new Date(2023, 4, 1), // May 1, 2023
//        status: 'Reading'
//      }
//    ]
//  },
//  {
//    bookName: '1984',
//    author: 'George Orwell',
//    copies: 3,
//    expanded: false,
//    bookData: [
//      {
//        qrNumber: 'QR1235',
//        issuedTo: 'Jane Smith',
//        issueDate: new Date(2023, 3, 5), // April 5, 2023
//        returnDate: new Date(2023, 4, 5), // May 5, 2023
//        status: 'Returned'
//      }
//    ]
//  },
//  // Continue filling out other books similarly...
//  {
//    bookName: 'Pride and Prejudice',
//    author: 'Jane Austen',
//    copies: 4,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'The Great Gatsby',
//    author: 'F. Scott Fitzgerald',
//    copies: 2,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  },
//  {
//    bookName: 'Great Expectations',
//    author: 'Charles Dickens',
//    copies: 6,
//    expanded: false,
//    bookData: [] // Assume no records yet
//  }
//];


@Component({
  selector: 'app-outer-table',
  templateUrl: './outer-table.component.html',
  styleUrls: ['./outer-table.component.css']
})
export class OuterTableComponent {

  constructor(private manageBooksService: ManageBooksService) { }

  @Input() filterValue: string = '';
  console = console;
  displayedColumns = ['bookName', 'author', 'copies'];
  dataSource = new MatTableDataSource<Element>([]);
  isNormalRow(index : any, row: any) { console.log(row); return !row.expanded; }
  isExpandedRow(index: any, row: any) { return row.expanded; }
  pageEvent !: PageEvent;
  currentPageSize: number = this.dataSource.paginator?.pageSize == null ? 0 : this.dataSource.paginator?.pageSize;


  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild('paginatorLabel', { static: false }) paginatorLabel !: ElementRef;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchDataFromApi();
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

  fetchDataFromApi() {
    this.manageBooksService.getAllBooks().subscribe(data => {
      const transformedData = this.transformData(data);
      this.dataSource.data = transformedData;
    }, error => {
      console.error('Error fetching data from API', error);
    });
  }

  transformData(apiData: any[]): Element[] {
    return apiData.map(book => ({
      bookName: book.title,
      author: book.authorNames,
      copies: book.numberOfCopies,
      expanded: false,
      bookData: book.bookQrDetails.map((detail: any) => ({
        bookQrMappingId: detail.bookQrMappingId,
        qrNumber: detail.qrNumber,
        issuedTo: detail.issuedTo,
        issueDate: detail.issueDate ? new Date(detail.issueDate) : null,
        returnDate: detail.returnDate ? new Date(detail.returnDate) : null,
        status: detail.status
      }))
    }));
  }


  //dataShow(event?: PageEvent) {
  //  console.log(event);
  //  this.currentPageSize = event?.pageSize != null ? event?.pageSize : this.currentPageSize;
  //}
}
