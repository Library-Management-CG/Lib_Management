import { Component, EventEmitter, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
@Component({
  selector: 'app-success-add-book',
  templateUrl: './success-add-book.component.html',
  styleUrls: ['./success-add-book.component.css']
})
export class SuccessAddBookComponent {

  qrArr: any;
  globalValue: any;
  constructor(private exploreService: ExploreBooksService) { }

  options: AnimationOptions = {
    path: '../../../assets/animation/Success.json',
  };

  ngOnInit() {
    this.exploreService.qrCodes$.subscribe(arr => {
      this.qrArr = arr;
      this.globalValue = this.exploreService.successIssue;
      console.log("globalvalue", this.globalValue);
    })
  }

  @Output() doneClicked: any = new EventEmitter<any>();

  reset() {
    this.doneClicked.emit();
    this.exploreService.resetQrCode();
  }

}
