import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../shared/services/user-service.service';

@Component({
  selector: 'app-new-explore-books',
  templateUrl: './new-explore-books.component.html',
  styleUrls: ['./new-explore-books.component.css']
})
export class NewExploreBooksComponent {

  exploreBooks = [];
  selectedBook: any;
  availablebooks=[]
  constructor(private router: Router, private user: UserServiceService) { };
  isChecked: boolean = false;


  ngOnInit(): void {

    this.exploreBookData();
   
  }

  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.availableBookData();
    }
  }
  redirect_back() {
    this.redirectToUserDashboard();
  }
  redirectToUserDashboard() {
    this.router.navigate(['']);
  }

  openModaldesc(book: any) {
    this.selectedBook = book;
  }

  exploreBookData() {
    this.user.explorebooks().subscribe(
      (data) => {
        this.exploreBooks = data;
        console.log(data);

      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }

  availableBookData() {
    this.user.availableExplore().subscribe(
      (data) => {
        this.availablebooks = data;
        console.log(data);

      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }




}
