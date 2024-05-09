import { Component } from '@angular/core';

@Component({
  selector: 'app-revoke-book-modal',
  templateUrl: './revoke-book-modal.component.html',
  styleUrls: ['./revoke-book-modal.component.css']
})
export class RevokeBookModalComponent {

  bookReceived : string = '';
  condition : string = '';


}
