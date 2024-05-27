import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-archive-modal',
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.css']
})
export class ArchiveModalComponent implements OnInit {

  archiveForm !: FormGroup;
  bookQrMappingId: any;
  updatedBy: any;
  visible: Boolean = true;

  @ViewChild('hiddenLabel') label!: ElementRef;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.archiveForm = this.fb.group({
      comment: ['', Validators.required]
    });

    this.updatedBy = 'EE9719E3-FBDA-4B98-AAF3-BD1123EDFE85'
    this.bookQrMappingId = 'D8A540D3-3516-4410-B472-019D7ED6A8A5'
  }

  @Input() bookName: string = '';
  @Input() bookQrCode: string = '';

  onSubmit(): void {
    if (this.archiveForm.valid) {
      const formData = {
        BookQrMappingId: this.bookQrMappingId,
        UpdatedBy: this.updatedBy,
        IsArchive: true,
        CommentDescription: this.archiveForm.get('comment')?.value
      };

      console.log("DATA TO BE POSTED : ", formData);
      this.label.nativeElement.click();



      //this.archiveService.archiveBook(formData).subscribe(
      //  response => {
      //    console.log('Book archived successfully', response);
      //  },
      //  error => {
      //    console.error('Error archiving book', error);
      //  }
      //);
    }
  }


}
