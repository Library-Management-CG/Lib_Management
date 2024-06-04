import { Component, EventEmitter, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ExploreBooksService } from '../../services/ExploreBooksService';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {

  //@EventEmitter fs
  qrArr: any;
  constructor(private exploreService: ExploreBooksService) { }

  options: AnimationOptions = {
    path: '../../../assets/animation/Success.json',
  };

  ngOnInit() {
    this.exploreService.qrCodes$.subscribe(arr => {
      this.qrArr = arr;
    })
  }

  @Output() doneClicked: any = new EventEmitter<any>();

  reset() {
    this.doneClicked.emit();
    this.exploreService.resetQrCode();
  }

}
