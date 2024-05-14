import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-control-mobile',
  templateUrl: './access-control-mobile.component.html',
  styleUrls: ['./access-control-mobile.component.css']
})
export class AccessControlMobileComponent {
  constructor(private router: Router) {

  }
  showBody = false;
  counti: any[] = [];
  toggle() {
    this.showBody = !this.showBody;
  }
  ngOnInit(): void{
    for (var i = 0; i < 5; i++) {
      this.counti[i] = i; 
    }
  }
  openModal() {
    this.router.navigate(['admin/assignPermission']);

  }

  routeTODasboard() {
    this.router.navigate(['/admin']);

  }
 
}
