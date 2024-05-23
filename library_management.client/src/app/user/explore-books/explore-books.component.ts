import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-books',
  templateUrl: './explore-books.component.html',
  styleUrls: ['./explore-books.component.css']
})
export class ExploreBooksComponent {
  constructor(private router: Router) { };
  isChecked: boolean = false;
   
  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
  }
  c: any = 0;
  c1: any = 0;
  c2: any = 0;
  c3: any = 0;
  c4: any = 0;

  handleCheckboxChange() { }
  redirect_back() {
    this.redirectToUserDashboard();
  }
  redirectToUserDashboard() {
    this.router.navigate(['']);
  }
}
