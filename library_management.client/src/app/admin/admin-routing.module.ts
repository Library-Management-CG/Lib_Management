import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AccessControlWebComponent } from './access-control-web/access-control-web.component';
import { AccessControlMobileComponent } from './access-control-mobile/access-control-mobile.component';
import { AssignPermissionModalComponent } from './assign-permission-modal/assign-permission-modal.component';
import { AssignPermissionSubPartComponent } from './assign-permission-modal/assign-permission-sub-part/assign-permission-sub-part.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,


    
  },
  {
    path: 'admin/manage-books',
    component: ManageBooksComponent,

  },
  { path: 'admin/accesscontrol', component: AccessControlWebComponent },
  { path: 'admin/accesscontrolmobile', component: AccessControlMobileComponent },
  { path: 'admin/assignPermission', component: AssignPermissionSubPartComponent },


]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
