import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../shared/services/user-service.service';
declare var $: any;

@Component({
  selector: 'app-access-control-mobile',
  templateUrl: './access-control-mobile.component.html',
  styleUrls: ['./access-control-mobile.component.css']
})
export class AccessControlMobileComponent {
  adminListMobile: any;
  constructor(private router: Router, private userService: UserServiceService) {

  }
  currIdx: any;
  currAdmin: any;
  showBody = false;
  counti: any[] = [];
  toggle() {
    this.showBody = !this.showBody;
  }
  ngOnInit(): void{
    for (var i = 0; i < 5; i++) {
      this.counti[i] = i; 
    }
    this.getAllAdmins();

  }

  getAllAdmins() {
    this.userService.getAllAdmins().subscribe(
      (data: any) => {
        console.log("getAllAmins",data);
        this.adminListMobile = data;

      },
      (error: any) => {
        console.log("User not found");
      });
  }

  openModal() {
    this.router.navigate(['admin/assignPermission']);

  }

  routeTODasboard() {
    this.router.navigate(['/admin']);

  }

  onRevokeAdminMobile(event: any) {
    console.log("hello", this.currAdmin);
    const revokeParams = {
      userId: this.currAdmin.id,
      role: "user"
    };
    this.userService.revokeUser(revokeParams).subscribe(
      (data: any) => {
        console.log(data);
        this.adminListMobile.splice(this.currIdx, 1);
      },
      (error: any) => {
        console.log("User not found");
      }
    );
  }


  onRevokeSingleUserMobile(event: { admin: any, index: number }) {


    //console.log("Revoke admin:", event.admin);
    this.currIdx = event.index;
    this.currAdmin = event.admin;
    
  }
 
}




