import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-control-web',
  templateUrl: './access-control-web.component.html',
  styleUrls: ['./access-control-web.component.css']
})
export class AccessControlWebComponent {

  constructor(private router: Router) {

  }

  routeTODasboard() {
    this.router.navigate(['/admin']);

  }
}
