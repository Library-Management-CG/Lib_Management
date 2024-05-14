import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-archive-modal',
  templateUrl: './archive-modal.component.html',
  styleUrls: ['./archive-modal.component.css']
})
export class ArchiveModalComponent {

  @Input() bookName: string = '';
  @Input() bookQrCode: string = '';


}
