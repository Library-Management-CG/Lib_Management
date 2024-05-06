import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-card-shared',
  templateUrl: './books-card-shared.component.html',
  styleUrls: ['./books-card-shared.component.css']
})
export class BooksCardSharedComponent {
  constructor(private router: Router) {

  }
  isAdmin() {
    return this.router.url.toLowerCase().includes('admin');
  }


  getStarsArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(true);
    }
    return stars;
  }

  getEmptyStarsArray(rating: number): boolean[] {
    const emptyStars = [];
    for (let i = rating; i < 5; i++) {
      emptyStars.push(false);
    }
    return emptyStars;
  }

}