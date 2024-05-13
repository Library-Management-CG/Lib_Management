import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-accordian',
  templateUrl: './mobile-accordian.component.html',
  styleUrls: ['./mobile-accordian.component.css']
})
export class MobileAccordianComponent {
  showBody = false;
  @Input() index: number = 0;



  toggle() {
    this.showBody = !this.showBody;
  }
}