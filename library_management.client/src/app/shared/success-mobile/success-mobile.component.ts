import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ExploreBooksService } from '../services/ExploreBooksService';

@Component({
  selector: 'app-success-mobile',
  templateUrl: './success-mobile.component.html',
  styleUrls: ['./success-mobile.component.css']
})


export class SuccessMobileComponent {
  globalValue: any;
  qrArr: any;

  options: AnimationOptions = {
    path: '../../../assets/animation/Success.json',
  };

  constructor(private router: Router, private exploreService: ExploreBooksService) { }

  ngOnInit() {
    this.globalValue = this.exploreService.successIssue;
    this.exploreService.qrCodes$.subscribe(arr => {
      this.qrArr = arr;
      this.globalValue = this.exploreService.successIssue;
      console.log("globalvalue", this.globalValue);
    })
  }

  reset() {
    this.exploreService.resetQrCode();
    this.router.navigate(['admin']);
  }
}
