import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books-mobile',
  templateUrl: './my-books-mobile.component.html',
  styleUrls: ['./my-books-mobile.component.css']
})
export class MyBooksMobileComponent {
  constructor(private router: Router) {

  }

  routeTODasboard() {
    this.router.navigate(['/']);
  }

}
