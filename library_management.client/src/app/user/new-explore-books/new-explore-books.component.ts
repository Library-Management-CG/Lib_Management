import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-explore-books',
  templateUrl: './new-explore-books.component.html',
  styleUrls: ['./new-explore-books.component.css']
})
export class NewExploreBooksComponent {
  constructor(private router: Router) { };
  isChecked: boolean = false;

  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
  }
  redirect_back() {
    this.redirectToUserDashboard();
  }
  redirectToUserDashboard() {
    this.router.navigate(['']);
  }
}
