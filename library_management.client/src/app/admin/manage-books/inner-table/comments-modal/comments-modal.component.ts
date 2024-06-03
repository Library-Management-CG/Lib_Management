import { Component, Input } from '@angular/core';
import { ManageBooksService } from '../../../../shared/services/manage-books.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.css']
})
export class CommentsModalComponent {
  @Input() bookQrMappingId: any;
  loading: boolean = true;
  commentsData: any[] = [];


  constructor(private manageBooksService: ManageBooksService) { }

  ngOnChanges() {
    console.log("BOOK ID : ", this.bookQrMappingId);

    if (this.bookQrMappingId != null) {
      this.fetchComments();
    }
  }

  fetchComments() {
    const inputData = {
      bookQrMappingId: this.bookQrMappingId
    };

    this.manageBooksService.getAllComments(inputData).subscribe(
      response => {
        this.commentsData = response;
        //this.loading = false;
        console.log('Comments : ', response);
      },
      error => {
        console.error('Error fetching comments: ', error);
      }
    );
  }

  convertUtcToLocalTime(date_to_convert_str: string): string {
    const date_to_convert = new Date(date_to_convert_str);
    const local_offset = date_to_convert.getTimezoneOffset() * 60 * 1000;
    const local_time = date_to_convert.getTime() - local_offset;
    const local_date = new Date(local_time);
    return local_date.toString();
  }
}
