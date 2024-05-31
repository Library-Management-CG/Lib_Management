import { Component, Input } from '@angular/core';
import { UserServiceService } from '../../../shared/services/user-service.service';

@Component({
  selector: 'app-permission-panel',
  templateUrl: './permission-panel.component.html',
  styleUrls: ['./permission-panel.component.css']
})
export class PermissionPanelComponent {

  @Input() selectedAdmin: any;
  isToggleChecked = true;

  onModalClose(event: boolean) {
    this.isToggleChecked = event;
  }

  constructor(private userService: UserServiceService) {

  }


  revokeEvent(event:any) {
    console.log(event);
    var revokeParams = {
      userId: this.selectedAdmin.id,
      role:"user"
    }
    console.log(revokeParams);
    this.userService.revokeUser(revokeParams).subscribe(
        (data: any) => {
          console.log(data);
        },
        (error: any) => {
          console.log("User not found");
        });
  }
}
