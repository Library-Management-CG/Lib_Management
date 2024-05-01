import { Component } from '@angular/core';

@Component({
  selector: 'app-add-books-modal',
  templateUrl: './add-books-modal.component.html',
  styleUrls: ['./add-books-modal.component.css']
})
export class AddBooksModalComponent {
  stepperIndex: number = 1;

  stepperIncrement() {
    this.stepperIndex++;
  }

  stepperDecrement() {
    this.stepperIndex--;
  }
}
