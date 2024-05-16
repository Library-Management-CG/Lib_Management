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
      },
      (error: any) => {
        console.log("User not found");
      });
  }

  onAdminSelected(admin: any) {
    console.log('Selected admin:', admin);
    this.adminSelectedFromList.emit(admin);
  }
}
