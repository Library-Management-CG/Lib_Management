import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ManageBooksService } from '../../../../shared/services/manage-books.service';


@Component({
  selector: 'app-revoke-book-modal',
  templateUrl: './revoke-book-modal.component.html',
  styleUrls: ['./revoke-book-modal.component.css']
})
export class RevokeBookModalComponent {

  //revokeForm !: FormGroup;
  bookReceived : string = '';
  @Input() bookIssueId : any;
  condition: string = '';
  commentDescription: string = '';
  updatedBy: any;
  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService) {
    this.bookReceived != '';
  }

  ngOnInit(): void {
    
    this.updatedBy = '4EE28B71-DFAE-4BC9-8FE8-1579970A9560';

  }

  hello() {
    console.log(this.bookReceived);
  }

  onSubmit(): void {
    if (this.bookIssueId != null &&  this.commentDescription != '' && this.bookReceived != '' && this.condition != '') {
      const formData = {
        BookIssueId: this.bookIssueId,
        UpdatedBy: this.updatedBy,
        IsBookReceived: this.bookReceived == 'yes' ? true : false,
        IsPerfect: this.condition == 'lost' ? null : this.condition == 'perfect' ? true : false,
        CommentDescription: this.commentDescription
      };

      console.log("DATA TO BE POSTED : ", formData);
      //this.label.nativeElement.click();



      this.manageBooksService.revokeBook(formData).subscribe(
        response => {
          console.log('Book revoked successfully', response);
          this.manageBooksService.notifyBookDataChanged();
          this.commentDescription = '';
          this.bookReceived = '';
          this.condition = '';
        },
        error => {
          console.error('Error archiving book', error);
        }
      );
    }
  }


}
