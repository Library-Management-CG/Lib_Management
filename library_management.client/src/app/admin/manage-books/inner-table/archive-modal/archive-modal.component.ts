import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageBooksService } from '../../../../shared/services/manage-books.service';
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

  constructor(private fb: FormBuilder, private manageBooksService: ManageBooksService) { }


  ngOnInit(): void {
    this.archiveForm = this.fb.group({
      comment: ['', Validators.required]
    });

    this.updatedBy = 'EE9719E3-FBDA-4B98-AAF3-BD1123EDFE85'
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
          this.archiveForm.reset();
        },
        error => {
          console.error('Error archiving book', error);
        }
      );
    }
  }


}
