import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-books-modal',
  templateUrl: './add-books-modal.component.html',
  styleUrls: ['./add-books-modal.component.css']
})
export class AddBooksModalComponent {
  /*@ViewChild('exampleModalCenter') modal: any;*/
  stepperIndex: number = 1;

  //constructor(private modalService: NgbModal) { } // Inject NgbModal service if you're using NgbModal

  //dismissModal() {
  //  this.modalService.dismissAll(); // Close all modals
  //}

  stepperIncrement() {
    this.stepperIndex++;
  }

  stepperDecrement() {
    this.stepperIndex--;
  }
}
