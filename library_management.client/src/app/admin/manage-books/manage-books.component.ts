import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css'],

})
export class ManageBooksComponent {
  constructor(private router: Router) { }

  filterValue: string = '';

  applyNewFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
  
  handleButtonClick(): void {

    this.router.navigate(['admin/issue-mobile-scanner']);

  }
}
