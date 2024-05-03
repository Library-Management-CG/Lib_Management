import { Component, ViewChild } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-add-books-modal',
  templateUrl: './add-books-modal.component.html',
  styleUrls: ['./add-books-modal.component.css']
})
export class AddBooksModalComponent {
  /*@ViewChild('exampleModalCenter') modal: any;*/
  stepperIndex: number = 0;

  //constructor(private modalService: NgbModal) { } // Inject NgbModal service if you're using NgbModal

  //dismissModal() {
  //  this.modalService.dismissAll(); // Close all modals
  //}

  ngOnInit(): void {
    $(document).ready(function () {
      $('#success').modal('show');
    });
  }

  stepperIncrement() {
    this.stepperIndex++;
  }

  stepperDecrement() {
    this.stepperIndex--;
  }
}
