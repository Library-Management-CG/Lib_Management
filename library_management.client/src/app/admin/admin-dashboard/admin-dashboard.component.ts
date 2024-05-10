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
  counti: number[] = [];
  openModal(): void {
    // Assuming you're using Bootstrap modal
    // You need to include Bootstrap JS in your project
    // You can use jQuery to trigger the modal
    $('#exampleModalCenter').modal('show');
  }

  ngOnInit(): void {
    //$(document).ready(function () {
    //  $('#exampleModalCenter').modal('show');
    //});
      for (let i = 1; i <= 10; i++) {
          this.counti.push(i);
      }
  }
  mostPopularBooks = [

    {
      title: 'The Invisible Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 4,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'The Invisible',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 3,
      numberOfPeopleReviewed: 28
    },



    {
      title: 'The Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 1,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 2,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'my',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 3,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'daryl',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 5,
      numberOfPeopleReviewed: 28
    },


  ];

 

}
