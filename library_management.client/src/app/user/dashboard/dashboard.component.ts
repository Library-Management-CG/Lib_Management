import { Component,ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showMoreClickedRecentlyAdded: boolean = false;
  showMoreClickedMostPopular: boolean = false;


  recentlyAddedBooks = [
    {
      title: 'The Invisible Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The Invisible',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The Invisible',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The my',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The daryl',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },
  ];

  mostPopularBooks = [

    {
      title: 'The Invisible Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
     },

    {
      title: 'The Invisible',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The Invisible',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The my',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    {
      title: 'The daryl',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: '../../../assets/icons/Rating.svg'
    },

    
  ];


  onShowMoreClicked(section: string) {
    if (section === 'recentlyAdded') {
      this.showMoreClickedRecentlyAdded = !this.showMoreClickedRecentlyAdded;
    } else if (section === 'mostPopular') {
      this.showMoreClickedMostPopular = !this.showMoreClickedMostPopular;
    }
  }
}
