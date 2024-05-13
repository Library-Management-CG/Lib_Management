import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { ExploreBooksComponent } from './explore-books/explore-books.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
   
  }
  , {
    path: 'my-books',
    component: MyBooksComponent,

  }
  , {
    path: 'explore-books',
    component: ExploreBooksComponent,

  }

]
@NgModule({
  declarations: [],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
