import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-permission-sub-part',
  templateUrl: './assign-permission-sub-part.component.html',
  styleUrls: ['./assign-permission-sub-part.component.css']
})
export class AssignPermissionSubPartComponent {
  constructor(private router: Router) {

  }
  GoBack() {
    this.router.navigate(['/admin/accesscontrolmobile']);

  }
}
