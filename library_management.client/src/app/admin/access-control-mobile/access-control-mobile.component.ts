import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-access-control-mobile',
  templateUrl: './access-control-mobile.component.html',
  styleUrls: ['./access-control-mobile.component.css']
})
export class AccessControlMobileComponent {

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
 
}
