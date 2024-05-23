import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-dropdown',
  templateUrl: './rating-dropdown.component.html',
  styleUrls: ['./rating-dropdown.component.css']
})
export class RatingDropdownComponent {
  c: any = 0;
  c1: any = 0;
  c2: any = 0;
  c3: any = 0;
  c4: any = 0;

  handleCheckboxChange() {
    console.log('Checkbox state changed');
}
}
