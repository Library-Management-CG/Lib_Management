import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../shared/services/user-service.service';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';

@Component({
  selector: 'app-access-control-web',
  templateUrl: './access-control-web.component.html',
  styleUrls: ['./access-control-web.component.css']
})
export class AccessControlWebComponent {
  selectedAdmin: any;
  constructor(private router: Router, private exploreBooksService: ExploreBooksService) {

  }

  routeTODasboard() {
    //this.exploreBooksService.notifynavbarToggleChanged();
    this.router.navigate(['/admin']);

  }

  onAdminSelectedFromList(admin: any) {
    //console.log('Selected admin:from main', admin);
    this.selectedAdmin = admin;
  }
}
