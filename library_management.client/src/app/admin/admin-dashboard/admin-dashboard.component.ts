import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  counti: number[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.counti.push(i);
    }
  }

}
