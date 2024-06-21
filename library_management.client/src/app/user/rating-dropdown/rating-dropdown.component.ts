import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RatingInnerContentComponent } from './rating-inner-content/rating-inner-content.component';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
import { Subject, takeUntil } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-rating-dropdown',
  templateUrl: './rating-dropdown.component.html',
  styleUrls: ['./rating-dropdown.component.css']
})
export class RatingDropdownComponent {
  isMobile: boolean = false;
  //private destroy: Subject = new Subject();

  selectedRatings: any[] = [];
  @Output() selectedValuesChange = new EventEmitter<any[]>();
  //@Output() openModalEvent = new EventEmitter<any>();
  constructor(private _bottomSheet: MatBottomSheet, private explore: ExploreBooksService) {
 
    this.checkScreenSize();
  }
  ngOnInit(){
    this.checkScreenSize();
    this.explore.ratingArray$.subscribe(totalbooks => {
      this.selectedratingsvalue(totalbooks);
      //  .pipe(
      //  takeUntil(this.destroy)     // import takeUntil from rxjs/operators.
      //).subscribe((obj:any) => {
      //  console.log('in vehicle item subscruber', obj);
      //});


    });
  }

  //ngOnDestroy() {
  //  this.destroy.next();
  //}

  onSelectedValuesChange(selectedValues: any[]): void {
    this.selectedRatings = selectedValues;
    //console.log(this.selectedRatings);
    if (this.selectedRatings) {
      this.selectedratingsvalue(this.selectedRatings);
    }
  }

  selectedratingsvalue(selectedValues: any[]): void {
    this.selectedValuesChange.emit(selectedValues);
  }
  openBottomSheet(): void {

    const bottomSheetRef = this._bottomSheet.open(RatingInnerContentComponent);
    console.log(this.selectedRatings);

    if (this.selectedRatings) {
      console.log(this.selectedRatings);
      this.selectedratingsvalue(this.selectedRatings);
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768; // Set your mobile breakpoint here
  }
}
