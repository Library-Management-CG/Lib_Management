import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize Bootstrap modal if needed
    // You can do this using jQuery or a library like ngx-bootstrap
  }

  handleButtonClick(): void {
    if (window.innerWidth <= 425) {
      // Navigate to the desired page if screen size is mobile or less
      this.router.navigate(['/admin/issue-mobile']);
    } else {
      // Open the modal if screen size is larger than mobile
      this.openModal();
    }
  }

  openModal(): void {
    $('#exampleModal').modal('show');
  }

}
