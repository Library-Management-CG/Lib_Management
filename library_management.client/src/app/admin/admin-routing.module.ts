import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    
  },
  {
    path: 'admin/manage-books',
    component: ManageBooksComponent,

  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
