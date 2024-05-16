import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-books-card-mobile',
  templateUrl: './my-books-card-mobile.component.html',
  styleUrls: ['./my-books-card-mobile.component.css']
})
export class MyBooksCardMobileComponent {
  @Input() books: any = {};
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
