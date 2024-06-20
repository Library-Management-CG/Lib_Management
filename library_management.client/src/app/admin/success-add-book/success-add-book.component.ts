import { Component, EventEmitter, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-success-add-book',
  templateUrl: './success-add-book.component.html',
  styleUrls: ['./success-add-book.component.css']
})
export class SuccessAddBookComponent {

  qrArr: any;
  globalValue: any;
  constructor(private exploreService: ExploreBooksService, private router: Router) { }

  options: AnimationOptions = {
    path: '../../../assets/animation/Success.json',
  };

  ngOnInit() {
    this.exploreService.qrCodes$.subscribe(arr => {
      this.qrArr = arr;
    })
    this.exploreService.successIssue$.subscribe(value => {
      this.globalValue = value;
      console.log("globalValue", this.globalValue);
    });
  }

  @Output() doneClicked: any = new EventEmitter<any>();

  reset() {
    this.doneClicked.emit();
    this.exploreService.resetQrCode();

    //this.router.navigateByUrl(this.router.url);
  }

}
