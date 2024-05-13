import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-time-remaining-modal',
  templateUrl: './time-remaining-modal.component.html',
  styleUrls: ['./time-remaining-modal.component.css']
})
export class TimeRemainingModalComponent {
  options: AnimationOptions = {
    path: '../../../assets/animation/clock.json',
  };
}
