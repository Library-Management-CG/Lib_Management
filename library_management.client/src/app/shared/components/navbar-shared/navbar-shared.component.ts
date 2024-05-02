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
    this.activeButton = button;
    this.isHighlighted = true;
    this.isDropdownOpen = false;
    this.isDropdownOpenadmin = false;

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
      this.router.navigate(['admin/manage-books']);
    }
  }
  toggleToUser(button: string) {
    if (button === 'readers-hub') {
      this.router.navigate(['/']);
    }

  }
  toggletoAdmin(button: string) {
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

  }
  admintoggleDropdown() {
    this.isDropdownOpenadmin = !this.isDropdownOpenadmin;

  }
  open_search() {
    this.isHighlighted = false;
    this.isDropdownOpen = false;


  }


  isAdmin() {
    return this.router.url.toLowerCase().includes('admin');
  }
  isadminmanage() {
    return this.router.url.toLowerCase().includes('admin/manage-books');

  }
}
