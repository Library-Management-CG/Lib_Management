import { Component, EventEmitter, Input, Output, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';
import { ModalContentComponent } from '../modal-content/modal-content.component';
declare var $: any;

@Component({
  selector: 'app-books-card-shared',
  templateUrl: './books-card-shared.component.html',
  styleUrls: ['./books-card-shared.component.css']
})
export class BooksCardSharedComponent {

  @Input() books: any = {};
  @Output() openModalEvent = new EventEmitter<any>();
  showModalToggle: boolean = false;


  openModal(book: any) {
    if (window.innerWidth > 758) {
      this.openModalEvent.emit(book);
      const modalElement = document.getElementById('exampleModal');
    
      $('#exampleModal').modal('show');
    
    }
    else if (window.innerWidth <= 758) {
      this.openModalEvent.emit(book);
      this.openBottomSheet(book);
    }
  }
 
  constructor(private router: Router, private _bottomSheet: MatBottomSheet, private renderer: Renderer2, private el: ElementRef) {
  }

  openBottomSheet(book: any): void {
    this.openModalEvent.emit(book);
    this._bottomSheet.open(ModalContentComponent);
  }

  ngOnInit() {
    console.log(this.books.statusName);
  }


  isAdmin() {
    return this.router.url.toLowerCase().includes('admin');
  }


  getStarsArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(true);
    }
    return stars;
  }

  getEmptyStarsArray(rating: number): boolean[] {
    const emptyStars = [];
    for (let i = rating; i < 5; i++) {
      emptyStars.push(false);
    }
    return emptyStars;
  }

}
