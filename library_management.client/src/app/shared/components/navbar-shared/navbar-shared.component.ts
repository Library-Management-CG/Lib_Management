import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-shared',
  templateUrl: './navbar-shared.component.html',
  styleUrls: ['./navbar-shared.component.css']
})
export class NavbarSharedComponent {
  activeButton: string ='';
  isTogglerClicked: boolean = false;
  isDropdownOpen: boolean = false;
  getrole: any;
  role: any;
  constructor(private router: Router) {

  }
  ngOnInit(): void
  {
    this.getRole();
    if (this.role=='User')
      this.toggleActiveButton('readers-hub');
    if (this.role == 'Admin')
   this.toggleActiveButton('Dashboard')
  }

  toggleActiveButton(button: string) {
    this.activeButton = button;

    if (button === 'my-books') {
      this.router.navigate(['/my-books']);
    }

    else if(button === 'readers-hub') {
      this.router.navigate(['/']);
    }
    else if (button === 'Dashboard') {
      this.router.navigate(['/admin']);
    }
    else if (button === 'manage-books') {
      this.router.navigate(['/']);
    }
    this.isTogglerClicked = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  getRole() {
    this.getrole = localStorage.getItem('user');
    
    const user = JSON.parse(this.getrole);

    this.role = user.role;

  }

}
