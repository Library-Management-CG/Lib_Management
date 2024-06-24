import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ManageBooksService } from '../../../../shared/services/manage-books.service';
import { ExploreBooksService } from '../../../../shared/services/ExploreBooksService';

@Component({
  selector: 'app-revoke-book-modal',
  templateUrl: './revoke-book-modal.component.html',
  styleUrls: ['./revoke-book-modal.component.css']
})
export class RevokeBookModalComponent implements OnInit, OnDestroy {
  @Input() bookIssueId: any;
  revokeForm: FormGroup;
  mappedBook: any;
  private mappedBookSubscription: Subscription | undefined;
  updatedBy: string;

  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService, private exploreBooksService: ExploreBooksService) {
    this.revokeForm = this.fb.group({
      bookReceived: ['', Validators.required],
      condition: ['', Validators.required],
      commentDescription: ['', Validators.required]
    });
    this.updatedBy = '1C7D283A-C22B-45CA-8F9D-1C1C3DD16E20';
  }

  ngOnInit(): void {
    this.mappedBookSubscription = this.exploreBooksService.mappedBook$.subscribe(
      mappedBook => {
        this.mappedBook = mappedBook;
        if (this.mappedBook && this.mappedBook.bookIssueId) {
          this.bookIssueId = this.mappedBook.bookIssueId;
        }
      },
      error => {
        console.error('Error fetching mapped book:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.mappedBookSubscription) {
      this.mappedBookSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.revokeForm.valid && this.bookIssueId != null) {
      const formData = {
        BookIssueId: this.bookIssueId,
        UpdatedBy: this.updatedBy,
        IsBookReceived: this.revokeForm.value.bookReceived === 'yes',
        IsPerfect: this.revokeForm.value.condition === 'perfect' ? true : (this.revokeForm.value.condition === 'lost' ? null : false),
        CommentDescription: this.revokeForm.value.commentDescription
      };

      console.log("DATA TO BE POSTED : ", formData);

      this.manageBooksService.revokeBook(formData).subscribe(
        response => {
          console.log('Book revoked successfully', response);
          this.manageBooksService.notifyBookDataChanged();
          this.revokeForm.reset();
        },
        error => {
          console.error('Error revoking book', error);
        }
      );
    }
  }
}
