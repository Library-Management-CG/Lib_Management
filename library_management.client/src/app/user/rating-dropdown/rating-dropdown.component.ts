import { Component, EventEmitter, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DropdownContentComponent } from '../dropdown-content/dropdown-content.component';

@Component({
  selector: 'app-rating-dropdown',
  templateUrl: './rating-dropdown.component.html',
  styleUrls: ['./rating-dropdown.component.css']
})
export class RatingDropdownComponent {

  constructor(private _bottomSheet: MatBottomSheet) { }


  openDropdown() {
    if (window.innerWidth <= 758) {
      const bottomSheetRef = this._bottomSheet.open(DropdownContentComponent);
      
    }
  }
}
