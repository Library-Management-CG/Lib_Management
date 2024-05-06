import { Component, EventEmitter, Output } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent {

  //@EventEmitter fs

  options: AnimationOptions = {
    path: '../../../assets/animation/Success.json',
  };

  @Output() doneClicked: any = new EventEmitter<any>();

  reset() {
    this.doneClicked.emit();
  }

}
