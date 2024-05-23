import { Component, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from '../../../shared/services/user-service.service';

@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.css']
})
export class ListPanelComponent {
  filterValue: string = '';
  filteredAdmin: any[];

  adminList: any = [];
  @Output() adminSelectedFromList: EventEmitter<any> = new EventEmitter<any>();
  selectedAdmin: any = 0;

  constructor(private userService: UserServiceService) {
    this.filteredAdmin = this.adminList;

  }

  ngOnInit() {
    this.getAllAdmins();
    
  }


  applyAccessoryFilter(event: Event) {
   this.filterValue = (event.target as HTMLInputElement).value;
    this.filteredAdmin = this.adminList.filter((admin: { firstName: string; }) =>
      admin.firstName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
   
  }

  getAllAdmins() {

    this.userService.getAllAdmins().subscribe(
      (data:any) => {
        console.log(data);
        this.adminList = data;
        this.filteredAdmin = this.adminList;

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
