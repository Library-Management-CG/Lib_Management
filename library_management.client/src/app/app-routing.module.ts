import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AccessControlWebComponent } from './admin/access-control-web/access-control-web.component';
import { AccessControlMobileComponent } from './admin/access-control-mobile/access-control-mobile.component';

const routes: Routes = [

 


  { path: 'admin/accesscontrol', component: AccessControlWebComponent },
  { path: 'admin/accesscontrolmobile', component: AccessControlMobileComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {

 

}
