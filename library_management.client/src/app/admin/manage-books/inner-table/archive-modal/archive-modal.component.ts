import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageBooksService } from '../../../../shared/services/manage-books.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

export interface BookData {
  bookQrMappingId: any;
  qrNumber: string;
  issuedTo: string;
  issueDate: Date;
  returnDate: Date;
  status: string;
}

@Component({
  selector: 'app-archive-modal',
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.css']
})
export class ArchiveModalComponent implements OnInit {

  archiveForm !: FormGroup;
  @Input() bookData !: BookData;
  //@Input() bookQrMappingId: any;
  @Input() isArchive: boolean = true;
  updatedBy: any;
  visible: Boolean = true;

  @ViewChild('hiddenLabel') label!: ElementRef;

  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.archiveForm = this.fb.group({
      comment: ['', Validators.required]
    });

    this.updatedBy = '1C7D283A-C22B-45CA-8F9D-1C1C3DD16E20'
    //this.bookQrMappingId = 'D8A540D3-3516-4410-B472-019D7ED6A8A5'
  }

  @Input() bookName: string = '';
  //@Input() bookQrCode: string = '';

  onSubmit(): void {
    if (this.archiveForm.valid) {
      const formData = {
        BookQrMappingId: this.bookData.bookQrMappingId,
        UpdatedBy: this.updatedBy,
        IsArchive: this.isArchive,
        CommentDescription: this.archiveForm.get('comment')?.value
      };

      console.log("DATA TO BE POSTED : ", formData);
      //this.label.nativeElement.click();



      this.manageBooksService.archiveBook(formData).subscribe(
        response => {
          console.log('Book archived successfully', response);
          if (formData.IsArchive == true) {
            this.toastr.success('Archived Successfully');
          }
          else if (formData.IsArchive == false){
            this.toastr.success('Retrieved Successfully');
          }
          this.manageBooksService.notifyBookDataChanged();
          this.archiveForm.reset();
        },
        error => {
          this.toastr.error('Error Performing Action');
          console.error('Error archiving book', error);
        }
      );
    }
  }


}
