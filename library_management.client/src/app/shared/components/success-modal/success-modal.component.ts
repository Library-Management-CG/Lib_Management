//import { Component, EventEmitter, Output } from '@angular/core';
//import { AnimationItem } from 'lottie-web';
//import { AnimationOptions } from 'ngx-lottie';
//import { ExploreBooksService } from '../../services/ExploreBooksService';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageBooksService } from '../../services/manage-books.service';
import { ExploreBooksService } from '../../services/ExploreBooksService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {

  //qrArr: any;
  //constructor(private exploreService: ExploreBooksService) { }

  //options: AnimationOptions = {
  //  path: '../../../assets/animation/Success.json',
  //};

  //ngOnInit() {
  //  this.exploreService.qrCodes$.subscribe(arr => {
  //    this.qrArr = arr;
  //  })
  //}

  //@Output() doneClicked: any = new EventEmitter<any>();

  //reset() {
  //  this.doneClicked.emit();
  //  this.exploreService.resetQrCode();
  //}

  mappedBook: any;
  private mappedBookSubscription: Subscription | undefined;

  bookReceived: string = '';
  bookIssueId: any;
  condition: string = '';
  commentDescription: string = '';
  updatedBy: any;
  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService, private exploreBooksService: ExploreBooksService) { }

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
