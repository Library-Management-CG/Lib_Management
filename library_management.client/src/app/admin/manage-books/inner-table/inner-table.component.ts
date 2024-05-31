import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
declare var $: any;

export interface BookData {
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


  @Input() bookDataArray2: BookData[] = [];
  @Input() bookName: string = ''; 
  bookData !: BookData;

  dataSource = new MatTableDataSource<BookData>([]); // Initialize with empty array
  displayedColumns: string[] = ['empty','qrNumber', 'issuedTo', 'issueDate', 'returnDate', 'status', 'comments', 'action'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookDataArray2'] && changes['bookDataArray2'].currentValue) {
      this.dataSource.data = changes['bookDataArray2'].currentValue;
      console.log(this.dataSource.data); // This should now log the actual array
    }
  }

  //ngOnInit() {
  //  $(document).ready(function () {
  //    $('#revokeBookModal').modal('show');
  //  });
  //}


}
