import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AccessControlWebComponent } from './access-control-web/access-control-web.component';
import { AccessControlMobileComponent } from './access-control-mobile/access-control-mobile.component';
import { AddBookMobileComponent } from './add-book-mobile/add-book-mobile.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminDashboardComponent,


    
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

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
