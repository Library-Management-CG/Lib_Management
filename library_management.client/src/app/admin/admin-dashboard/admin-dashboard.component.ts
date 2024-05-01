import { Component } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  ngOnInit(): void {
    $(document).ready(function () {
      $('#exampleModalCenter').modal('show');
    });
  }
}
