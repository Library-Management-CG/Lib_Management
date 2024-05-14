import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { MyBooksMobileComponent } from './my-books-mobile/my-books-mobile.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
   
  }
  , {
    path: 'my-books',
    component: MyBooksComponent,

  },
  {
    path: 'my-books-mobile',
    component: MyBooksMobileComponent,

  }

]
@NgModule({
  declarations: [],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
