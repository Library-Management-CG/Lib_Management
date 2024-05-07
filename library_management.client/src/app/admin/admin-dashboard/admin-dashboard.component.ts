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
  

 

}
