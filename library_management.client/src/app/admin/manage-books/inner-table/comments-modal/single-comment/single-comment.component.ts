import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent {
  @Input() commentDetails: any;

  convertUtcToLocalTime(date_to_convert_str: string): string {
    const date_to_convert = new Date(date_to_convert_str);
    const local_offset = date_to_convert.getTimezoneOffset() * 60 * 1000;
    const local_time = date_to_convert.getTime() - local_offset;
    const local_date = new Date(local_time);
    return local_date.toString();
  }
}
