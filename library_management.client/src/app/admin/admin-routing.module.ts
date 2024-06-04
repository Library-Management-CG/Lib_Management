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
import { AddBookMobileComponent } from './add-book-mobile/add-book-mobile.component';
import { IssueMobileComponent } from './issue-mobile/issue-mobile.component';
import { ScannerComponent } from './issue-modal-body/scanner/scanner.component';
import { CaptureComponent } from './capture/capture.component';
import { CaptureMobileComponentComponent } from './capture/capture-mobile-component/capture-mobile-component.component';
import { SuccessMobileComponent } from '../shared/success-mobile/success-mobile.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,



  },
  {
    path: 'admin/add-book-scanner',
    component:CaptureMobileComponentComponent,



  },
  {
    path: 'admin/manage-books',
    component: ManageBooksComponent,

  },
  {
    path: 'admin/add-book-mobile',
    component: AddBookMobileComponent,
  },
  { path: 'admin/accesscontrol', component: AccessControlWebComponent },
  { path: 'admin/accesscontrolmobile', component: AccessControlMobileComponent },
  { path: 'admin/assignPermission', component: AssignPermissionSubPartComponent },

  {
    path: 'admin/issue-mobile',
    component: IssueMobileComponent
  },
   {
    path: 'admin/issue-mobile-scanner',
    component: ScannerComponent
  },
  {
    path: 'admin/success-mobile',
    component: SuccessMobileComponent
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
