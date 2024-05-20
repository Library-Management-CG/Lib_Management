import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-revoke-permission-modal',
  templateUrl: './revoke-permission-modal.component.html',
  styleUrls: ['./revoke-permission-modal.component.css']
})
export class RevokePermissionModalComponent {
  selectedAdmin: any;
  isToggleChecked = true;
  //handleModalClose() {
  //  this.isToggleChecked = true;
  //}


  @Output() modalClosed = new EventEmitter<boolean>();

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
  }

}
