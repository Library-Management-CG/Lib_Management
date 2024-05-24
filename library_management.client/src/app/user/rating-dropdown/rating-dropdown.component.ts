import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-dropdown',
  templateUrl: './rating-dropdown.component.html',
  styleUrls: ['./rating-dropdown.component.css']
})
export class RatingDropdownComponent {
  c = false;
  c1 = false;
  c2 = false;
  c3 = false;
  c4 = false;
  c5 = false;

  handleCheckboxChange(value: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Checkbox with value ${value} is now ${isChecked ? 'checked' : 'unchecked'}`);

    this.updateSelectAllState();

    this.logSelectedValues();
  }

  updateSelectAllState() {
    this.c = this.c1 && this.c2 && this.c3 && this.c4;
  }

  logSelectedValues() {
    const selectedValues = [];
    if (this.c1) selectedValues.push(1);
    if (this.c2) selectedValues.push(2);
    if (this.c3) selectedValues.push(3);
    if (this.c4) selectedValues.push(4);
    if (this.c5) selectedValues.push(5);


    console.log('Currently selected values:', selectedValues);
  }

  toggleSelectAll() {
    const newState = this.c;
    this.c1 = newState;
    this.c2 = newState;
    this.c3 = newState;
    this.c4 = newState;
    this.c5 = newState;

    console.log(`Select All is now ${newState ? 'checked' : 'unchecked'}`);

    this.logSelectedValues();
  }
}
