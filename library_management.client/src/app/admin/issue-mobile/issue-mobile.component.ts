import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-mobile',
  templateUrl: './issue-mobile.component.html',
  styleUrls: ['./issue-mobile.component.css']
})
export class IssueMobileComponent {
  constructor(private router: Router) { };
  redirect_back() {
    this.redirectToScanner();
  }
  redirectToScanner() {
    this.router.navigate(['admin']);
  }
}
