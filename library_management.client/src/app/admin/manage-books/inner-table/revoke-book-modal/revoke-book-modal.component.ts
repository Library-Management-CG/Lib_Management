import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService) { }

  ngOnInit(): void {
    
    this.updatedBy = 'EE9719E3-FBDA-4B98-AAF3-BD1123EDFE85';

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
        },
        error => {
          console.error('Error archiving book', error);
        }
      );
    }
  }


}
