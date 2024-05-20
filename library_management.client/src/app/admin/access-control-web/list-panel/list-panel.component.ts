import { Component, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from '../../../shared/services/user-service.service';

@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.css']
})
export class ListPanelComponent {
  adminList: any = [];
  @Output() adminSelectedFromList: EventEmitter<any> = new EventEmitter<any>();
  selectedAdmin: any = 0;

  constructor(private userService: UserServiceService) {

  }

  ngOnInit() {
    this.getAllAdmins();
    
  }

  getAllAdmins() {
    this.userService.getAllAdmins().subscribe(
      (data:any) => {
        console.log(data);
        this.adminList = data;
        if (this.adminList) {
          this.onAdminSelected(this.adminList[0]);
          this.selectedAdmin = this.adminList[0];
        }
      },
      (error: any) => {
        console.log("User not found");
      });
  }

  onAdminSelected(admin: any) {
    this.adminSelectedFromList.emit(admin);
    this.selectedAdmin = admin;
  }
}
