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
    const isMobile = window.matchMedia('(max-width: 425px)').matches;
    if (isMobile) {
      this.router.navigate(['/admin/issue-mobile']);
    } else {
      this.openModal();
    }
  }

  openModal(): void {
    $('#exampleModalIssue').modal('show');
  }

}
