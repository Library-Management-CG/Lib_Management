import { Component, Input } from '@angular/core';
import { UserServiceService } from '../../../shared/services/user-service.service';
import { ExploreBooksService } from '../../../shared/services/ExploreBooksService';

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
    console.log(event);
  }

  constructor(private userService: UserServiceService, private exploreService: ExploreBooksService) {

  }

  ngOnInit() {
    this.exploreService.isToggleChecked$.subscribe(value => {
      this.isToggleChecked = true;
    });
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
        console.log("hellooo", this.selectedAdmin);
        this.exploreService.removeAdmin(this.selectedAdmin.id);
        this.exploreService.setToggleChecked(true);
        //this.exploreService.setAllAdmin();
        },
        (error: any) => {
          console.log("User not found");
        });
  }
}
