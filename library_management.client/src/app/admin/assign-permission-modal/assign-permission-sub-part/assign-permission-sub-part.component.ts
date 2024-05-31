import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../shared/services/user-service.service';

@Component({
  selector: 'app-assign-permission-sub-part',
  templateUrl: './assign-permission-sub-part.component.html',
  styleUrls: ['./assign-permission-sub-part.component.css']
})
export class AssignPermissionSubPartComponent {
  adminList: any;
  selectedUser: any;
  constructor(private router: Router, private userService: UserServiceService) {

  }
  GoBack() {
    this.router.navigate(['/admin/accesscontrolmobile']);

  }

  ngOnInit() {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.adminList = data;
        if (this.adminList) {
          //this.onAdminSelected(this.adminList[0]);
          //this.selectedAdmin = this.adminList[0];
        }
      },
      (error: any) => {
        console.log("User not found");
      });
  }

  Save() {
    var revokeParams = {
      userId: this.selectedUser,
      role: "admin"
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
