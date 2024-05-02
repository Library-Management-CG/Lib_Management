import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeButton: string = 'readers-hub';
  isTogglerClicked: boolean = false;
  isDropdownOpen: boolean = false;
  constructor(private router: Router) { }


  toggleActiveButton(button: string) {
    this.activeButton = button;

    if (button === 'my-books') {
      this.router.navigate(['/my-books']);
    }

    if (button === 'readers-hub') {
      this.router.navigate(['/']);
    }
    this.isTogglerClicked = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleCollapse() {
    this.isTogglerClicked = !this.isTogglerClicked;
  }
}
