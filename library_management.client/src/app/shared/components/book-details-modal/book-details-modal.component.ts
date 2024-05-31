import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.css'],
  
})
export class BookDetailsModalComponent {
  @Input() books: any = {};


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
