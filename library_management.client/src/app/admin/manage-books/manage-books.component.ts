import {Component} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css'],

})
export class ManageBooksComponent {
  constructor(private router: Router) { }

  filterValue: string = '';
  showArchivedBooks: boolean = false;


  applyNewFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
  
  //handleButtonClick(): void {

  //  this.router.navigate(['admin/issue-mobile-scanner']);

  //}

  handleButtonClick(): void {

    const navigationExtras: NavigationExtras = {

      state: { previousUrl: this.router.url, page: 'issue' }

    };

    this.router.navigate(['admin/issue-mobile-scanner'], navigationExtras);

  }
}
