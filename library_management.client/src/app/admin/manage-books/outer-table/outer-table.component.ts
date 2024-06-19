import { Component, ViewChild, AfterViewInit, Input, SimpleChanges, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageBooksService } from '../../../shared/services/manage-books.service';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ExploreBooksService } from '../../../shared/services/ExploreBooksService';

export interface Element {
  bookName: string;
  bookImage: any;
  author: string;
  copies: number;
  expanded: boolean;
  bookData: BookData[];
}

export interface BookData {
  bookIssueId: any;
  bookQrMappingId: any;
  qrNumber: string;
  issuedTo: string;
  issueDate: Date;
  returnDate: Date;
  status: string;
}


@Component({
  selector: 'app-outer-table',
  templateUrl: './outer-table.component.html',
  styleUrls: ['./outer-table.component.css']
})
export class OuterTableComponent {

  constructor(private manageBooksService: ManageBooksService, private sanitizer: DomSanitizer, private explorebook: ExploreBooksService) { }

  loading: boolean = true;
  @Input() showArchivedBooks: boolean = false;
  @Input() filterValue: string = '';
  console = console;
  displayedColumns = ['bookName', 'author', 'copies'];
  dataSource = new MatTableDataSource<Element>(this.getInitialData());
  isNormalRow(index : any, row: any) { console.log(row); return !row.expanded; }
  isExpandedRow(index: any, row: any) { return row.expanded; }
  pageEvent !: PageEvent;
  currentPageSize: number = this.dataSource.paginator?.pageSize == null ? 0 : this.dataSource.paginator?.pageSize;


  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild('paginatorLabel', { static: false }) paginatorLabel !: ElementRef;


  ngOnInit() {
    //this.fetchDataFromApi();
    this.manageBooksService.bookDataChanged$.subscribe(() => {
      this.fetchDataFromApi();
    });

    this.explorebook.totalBook$.subscribe(() => {
      this.fetchDataFromApi();
    });

    this.fetchDataFromApi();
    this.dataSource.paginator = this.paginator;


  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterValue']) {
      const filterValue = changes['filterValue'].currentValue || '';
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    if (changes['showArchivedBooks']) {
      //console.log("Archived : ", this.showArchivedBooks);
      this.fetchDataFromApi();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    this.loading = true;

    const expandedState = this.dataSource.data.reduce((acc, book) => {
      acc[book.bookName] = book.expanded;
      return acc;
    }, {} as { [key: string]: boolean });

    const inputObject = {
      IsArchived : this.showArchivedBooks
    }

    this.manageBooksService.getAllBooks(inputObject).subscribe(data => {
      const transformedData = this.transformData(data, expandedState);
      this.dataSource.data = transformedData;
      this.manageBooksService.setTotalItemFromStore(this.dataSource.data.length);
      this.resetPaginator();
      this.loading = false;
    }, error => {
      console.error('Error fetching data from API', error);
    });
  }

  transformData(apiData: any[], expandedState: { [key: string]: boolean }): Element[] {
    return apiData.map(book => ({
      bookName: book.title,
      bookImage: book.imageLink,
      author: book.authorNames,
      copies: book.numberOfCopies,
      expanded: expandedState[book.title] || false, // Preserve the expanded state
      bookData: book.bookQrDetails.map((detail: any) => ({
        bookIssueId: detail.bookIssueId,
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

  resetPaginator() {
    if (this.paginator) {
      this.paginator.firstPage();
      this.paginator.length = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    }
  }   

  getInitialData(): Element[] {
    return Array.from({ length: 10 }, (_, i) => ({
      bookName: 'Loading...',
      bookImage: '',
      author: 'Loading...',
      copies: 0,
      expanded: false,
      bookData: []
    }));
  }
}
