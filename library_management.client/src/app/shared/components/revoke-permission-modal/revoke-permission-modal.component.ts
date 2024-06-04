import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExploreBooksService } from '../../services/ExploreBooksService';

@Component({
  selector: 'app-revoke-permission-modal',
  templateUrl: './revoke-permission-modal.component.html',
  styleUrls: ['./revoke-permission-modal.component.css']
})
export class RevokePermissionModalComponent {
  
  isToggleChecked = true;
  //handleModalClose() {
  //  this.isToggleChecked = true;
  //}

  //@Input() selectedAdmin: any;
  @Output() modalClosed = new EventEmitter<boolean>();
  @Output() revokeAdminMobile = new EventEmitter<boolean>();

  @Output() revokeEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private exploreService: ExploreBooksService) { }

  handleModalClose() {
    this.modalClosed.emit(true);
  }


  changeRole() {
    
    //if (this.checkUser() == true) {
    //  //this.toastr.error("This action can't be taken");
    //  this.isToggleChecked = true;
    //  return;
    //}

    //const userData = {
    //  userId: this.selectedAdmin.id,
    //  newRole: 'User'
    //};

    //this.dataService.changeUserRole(userData).subscribe(
    //  (response) => {
    //    this.adminDetailService.notifyAdminListChanged();
    //    this.isToggleChecked = true;
    //  },
    //  (error) => {
    //    console.log("User not found");
    //  });
    if (window.innerWidth <= 767) {
      this.revokeAdminMobile.emit(true);
    } else {

      this.revokeEvent.emit(true);
    }
    
    
  }

}
