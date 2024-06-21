import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExploreBooksService } from '../../../shared/services/ExploreBooksService';
declare var $: any;

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
  selector: 'app-inner-table',
  templateUrl: './inner-table.component.html',
  styleUrls: ['./inner-table.component.css']
})
export class InnerTableComponent implements OnChanges {

  constructor(private exploreBooksService: ExploreBooksService) { }

  isArchive: boolean = true;
  @Input() bookDataArray2: BookData[] = [];
  @Input() bookName: string = ''; 
  bookData !: BookData;

  dataSource = new MatTableDataSource<BookData>([]); // Initialize with empty array
  displayedColumns: string[] = ['empty','qrNumber', 'issuedTo', 'issueDate', 'returnDate', 'status', 'comments', 'action'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookDataArray2'] && changes['bookDataArray2'].currentValue) {
      this.dataSource.data = changes['bookDataArray2'].currentValue;
      console.log("data : ", this.dataSource.data);
    }
  }

  isBookIssued(book: any): boolean {
    return book.status.toLowerCase() === 'not available';
  }

  setBookIssueId(bookDetails : any) {
    this.exploreBooksService.setMappedBook(bookDetails);
  }

  openRevokeBookModal() {
    $('#revokeBookModal').modal('show');
  }

  //getInitialData(): BookData[] {
  //  return Array.from({ length: 2 }, (_, i) => ({
  //    bookIssueId: null,
  //    bookQrMappingId: null,
  //    qrNumber: 'Loading...',
  //    issuedTo: 'Loading...',
  //    issueDate: new Date,
  //    returnDate: new Date,
  //    status: 'Loading...'
  //  }));
  //}


}
