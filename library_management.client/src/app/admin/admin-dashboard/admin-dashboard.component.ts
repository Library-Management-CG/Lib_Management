import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  counti: number[] = [];
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
