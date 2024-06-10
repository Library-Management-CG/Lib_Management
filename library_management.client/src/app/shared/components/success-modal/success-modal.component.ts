//import { Component, EventEmitter, Output } from '@angular/core';
//import { AnimationItem } from 'lottie-web';
//import { AnimationOptions } from 'ngx-lottie';
//import { ExploreBooksService } from '../../services/ExploreBooksService';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageBooksService } from '../../services/manage-books.service';

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


  bookReceived: string = '';
  @Input() bookIssueId: any;
  condition: string = '';
  commentDescription: string = '';
  updatedBy: any;
  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService) { }

  ngOnInit(): void {

    this.updatedBy = '3A5B5AF8-5703-4872-A098-0EF31480DB57';

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
