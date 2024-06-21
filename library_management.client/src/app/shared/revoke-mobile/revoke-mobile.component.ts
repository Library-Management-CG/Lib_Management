import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ManageBooksService } from '../services/manage-books.service';
import { ExploreBooksService } from '../services/ExploreBooksService';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-revoke-mobile',
  templateUrl: './revoke-mobile.component.html',
  styleUrls: ['./revoke-mobile.component.css']
})
export class RevokeMobileComponent {

  mappedBook: any;
  private mappedBookSubscription: Subscription | undefined;

  bookReceived: string = '';
  bookIssueId: any;
  condition: string = '';
  commentDescription: string = '';
  updatedBy: any;
  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService, private exploreBooksService: ExploreBooksService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.updatedBy = '1C7D283A-C22B-45CA-8F9D-1C1C3DD16E20';

    this.mappedBookSubscription = this.exploreBooksService.mappedBook$.subscribe(
      mappedBook => {
        this.mappedBook = mappedBook;
        if (this.mappedBook && this.mappedBook.bookIssueId) {
          this.bookIssueId = this.mappedBook.bookIssueId;
        }
        //  console.log('Mapped book:', this.mappedBook);
      },
      error => {
        console.error('Error fetching mapped book:', error);
      }
    );


  }




  onSubmit(): void {
    if (this.bookIssueId != null && this.commentDescription != '' && this.bookReceived != '' && this.condition != '') {
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
          this.toastr.success('Book Returned Successfully');
          this.commentDescription = '';
          this.bookReceived = '';
          this.condition = '';
          this.router.navigate(['/admin']);
        },
        error => {
          this.toastr.error('Book can not be returned');
          console.error('Error archiving book', error);
        }
      );
    }
  }



}
