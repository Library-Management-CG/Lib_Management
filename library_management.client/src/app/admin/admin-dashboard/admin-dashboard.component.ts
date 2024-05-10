import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  //ngOnInit(): void {
  //  $(document).ready(function () {
  //    $('#exampleModalCenter').modal('show');
  //  });
  //}

  constructor(private router: Router) { }

  handleButtonClick() {
    if (window.innerWidth <= 767) {
      // Navigate to the desired page if screen size is mobile or less
      this.router.navigate(['/admin/add-book-mobile']);
    } else {
      // Open the modal if screen size is larger than mobile
      this.openModal();
    }
  }

  openModal(): void {
    // Assuming you're using Bootstrap modal
    // You need to include Bootstrap JS in your project
    // You can use jQuery to trigger the modal
    $('#exampleModalCenter').modal('show');
  }
}
