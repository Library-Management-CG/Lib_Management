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

  loading: boolean = true;

  constructor(private userservice: UserServiceService) { }

  userId: any;
  stars: boolean[] = [];
  @Input() filterValue: string = '';


  displayedColumns = ['bookName', 'author', 'qrNumber', 'dateOfIssue', 'dateOfReturn', 'rating', 'status'];
  dataSource = new MatTableDataSource<Element>(this.getInitialData());
  
  pageEvent !: PageEvent;
  currentPageSize: number = this.dataSource.paginator?.pageSize == null ? 0 : this.dataSource.paginator?.pageSize;


  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild('paginatorLabel', { static: false }) paginatorLabel !: ElementRef;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.userId = '2AC8C146-3276-46FB-8298-40B7A82723F3';
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
    this.loading = true;

    this.userservice.getMyBooksMobile(this.userId).subscribe(
      (data) => {
        //console.log('hello : ', data);
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
        this.loading = false;

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

  getInitialData(): Element[] {
    return Array.from({ length: 10 }, (_, i) => ({
      bookName: 'Loading...',
      author: 'Loading...',
      qrNumber: 'Loading...',
      dateOfIssue: 'Loading...',
      dateOfReturn: 'Loading...',
      rating: 0,
      status: 'Loading...',
      image:''
    }));
  }
}
