import { Component, ViewChild, AfterViewInit, Input, SimpleChanges, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from '../../../shared/services/user-service.service';

interface Element {
  bookName: string;
  author: string;
  qrNumber: string;
  dateOfIssue: string;
  dateOfReturn: string;
  rating: number;
  status: string;
  image: any;
}

@Component({
  selector: 'app-my-books-table',
  templateUrl: './my-books-table.component.html',
  styleUrls: ['./my-books-table.component.css']
})
export class MyBooksTableComponent {
  constructor(private userservice: UserServiceService) { }

  userId: any;
  stars: boolean[] = [];
  @Input() filterValue: string = '';


  displayedColumns = ['bookName', 'author', 'qrNumber', 'dateOfIssue', 'dateOfReturn', 'rating', 'status'];
  dataSource = new MatTableDataSource<Element>([]);
  
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterValue']) {
      const filterValue = changes['filterValue'].currentValue || '';
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  fetchDataFromApi() {
    this.userservice.getMyBooksMobile(this.userId).subscribe(
      (data) => {
        console.log('hello : ', data);
        const transformedData = data.map((item: any) => ({
          bookName: item.bookName,
          author: item.author.join(', '), // Joining array of authors
          qrNumber: item.qrCode,
          dateOfIssue: new Date(item.issueDate).toLocaleDateString(),
          dateOfReturn: new Date(item.returnDate).toLocaleDateString(),
          rating: item.points,
          status: item.status,
          image: item.image
        }));

        this.dataSource.data = transformedData;
      },
      (error) => {
        console.error('Error:', error);
      });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'status-submitted';
      case 'reading':
        return 'status-reading';
      case 'lost':
        return 'status-lost';
      default:
        return '';
    }
  }
}
