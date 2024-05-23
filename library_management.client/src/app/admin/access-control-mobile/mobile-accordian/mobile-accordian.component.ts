import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserServiceService } from '../../../shared/services/user-service.service';

@Component({
  selector: 'app-mobile-accordian',
  templateUrl: './mobile-accordian.component.html',
  styleUrls: ['./mobile-accordian.component.css']
})
export class MobileAccordianComponent {
  showBody = false;
  @Input() index: number = 0;
  @Input() adminMobile: any;
  isToggleChecked = true;

  @Output() revokeSingleUserMobile = new EventEmitter<{ admin: any, index: number }>();

  constructor(private userService: UserServiceService) {  }

  //onRevokeAdminMobile(event: any) {
  //  //console.log(event);
  //  //this.revokeSingleUserMobile.emit({ admin: this.adminMobile, index: this.index });
  //}

  onModalClose(event: boolean) {
    this.isToggleChecked = event;
    console.log(this.adminMobile);
  }

  toggle() {
    this.showBody = !this.showBody;
  }

  changes() {
    this.revokeSingleUserMobile.emit({ admin: this.adminMobile, index: this.index });
  }
}
