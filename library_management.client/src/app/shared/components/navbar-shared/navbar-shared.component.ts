import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar-shared',
  templateUrl: './navbar-shared.component.html',
  styleUrls: ['./navbar-shared.component.css']
})
export class NavbarSharedComponent {
  activeButton: string ='';
  isDropdownOpen: boolean = false;
  isDropdownOpenadmin: boolean= false;
  getrole: any;
  role: any;
  roleName: any;
  isHighlighted: boolean = true;
  isTogglerClicked: boolean = false;
   isSettingsClicked: boolean = false;
  isMyBooksClicked: boolean = false;
  constructor(private router: Router, private renderer: Renderer2, private elementRef: ElementRef) {

  }
  ngOnInit(): void
  {
    this.getRole();
    if (this.role=='User')
      this.toggleActiveButton('readers-hub');
    if (this.role == 'Admin')
      this.toggleActiveButton('Dashboard');

    this.renderer.listen('document', 'click', (event) => {
      if (!this.isDropdownOpen || this.elementRef.nativeElement.contains(event.target)) {
        return;
      }
      this.isDropdownOpen = false;
    });
    this.renderer.listen('document', 'click', (event) => {
      if (!this.isDropdownOpenadmin || this.elementRef.nativeElement.contains(event.target)) {
        return;
      }
      this.isDropdownOpenadmin = false;
    });

  }

  toggleActiveButton(button: string) {
    this.isHighlighted = true;
    this.isDropdownOpen = false;
    this.isDropdownOpenadmin = false;

    this.isSettingsClicked = false;

    if (button === 'my-books') {
      this.isMyBooksClicked = true;
      this.routeBasedOnScreenSizeMyBooks();

    }

    else if (button === 'readers-hub') {
      this.isMyBooksClicked = false;

      this.router.navigate(['/']);
    }
    else if (button === 'Dashboard') {
      this.isMyBooksClicked = false;

      this.router.navigate(['/admin']);
    }
    else if (button === 'manage-books') {
      this.isMyBooksClicked = false;

      this.router.navigate(['admin/manage-books']);
    }

  }
  toggleToUser(button: string) {
    this.isSettingsClicked = false;
    this.isMyBooksClicked = false;

    if (button === 'readers-hub') {
      this.router.navigate(['/']);
    }

  }
  toggletoAdmin(button: string) {
    this.isSettingsClicked = false;
    this.isMyBooksClicked = false;

    if (button === 'Dashboard') {
      this.router.navigate(['/admin']);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  getRole() {
    this.getrole = localStorage.getItem('user');
    
    const user = JSON.parse(this.getrole);

    this.role = user.role;
    this.roleName = user.firstName;
  }
  open_settings() {
    this.isHighlighted = false;
    this.isDropdownOpenadmin = false;
    this.isMyBooksClicked = false;

    this.isSettingsClicked = true; // Flag indicating that settings button is clicked
    this.routeBasedOnScreenSize(); 
  }

  routeBasedOnScreenSize() {
    if (this.isSettingsClicked) {
      if (window.innerWidth <= 765) {
        this.router.navigate(['/admin/accesscontrolmobile']);
      } else {
        this.router.navigate(['/admin/accesscontrol']);
      }
    }
  }
  routeBasedOnScreenSizeMyBooks() {
    if (this.isMyBooksClicked) {
      if (window.innerWidth <= 765) {
        this.router.navigate(['/my-books-mobile']);
      } else {
        this.router.navigate(['/my-books']);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Check responsiveness only after settings button is clicked
    if (this.isSettingsClicked) {
      this.routeBasedOnScreenSize();
    }
    if (this.isMyBooksClicked) {
      this.routeBasedOnScreenSizeMyBooks();
    }
  }

  
  admintoggleDropdown() {
    this.isDropdownOpenadmin = !this.isDropdownOpenadmin;

  }
  open_search() {
    this.isHighlighted = false;
    this.isDropdownOpen = false;
    this.isMyBooksClicked = false;

    this.isSettingsClicked = false;

  }


  isAdmin() {
    return this.router.url.toLowerCase().includes('admin');
  }

  toggleCollapse() {
    this.isTogglerClicked = !this.isTogglerClicked;
 
  }
  closeMobileNavbar(): void {
    // Check if the navbar is collapsed
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar?.classList.contains('show')) {
      // Close the navbar collapse
      navbar.classList.remove('show');
      this.isTogglerClicked = false;
    }
  }
  open_explore() {
    // Redirect to the explore-books route
    this.redirectToExploreBooks();
  }

  redirectToExploreBooks() {
    // Navigate to the explore-books route
    this.router.navigate(['/new-explore-books']);
  }
}
