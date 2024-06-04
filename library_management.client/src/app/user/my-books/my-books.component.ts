import { Component } from '@angular/core';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent {

  filterValue: string = '';

  applyNewFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }

}
