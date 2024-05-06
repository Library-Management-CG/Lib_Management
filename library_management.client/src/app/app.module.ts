import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminRoutingModule } from './admin/admin-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { MyBooksComponent } from './user/my-books/my-books.component';
import { ManageBooksComponent } from './admin/manage-books/manage-books.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NavbarSharedComponent } from './shared/components/navbar-shared/navbar-shared.component';
import { AvatarModule } from 'ngx-avatars';
import { BookDetailsModalComponent } from './shared/components/book-details-modal/book-details-modal.component';
import { BooksCardSharedComponent } from './shared/components/books-card-shared/books-card-shared.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    UserComponent,
    MyBooksComponent,
    ManageBooksComponent,

    AdminDashboardComponent,
    NavbarSharedComponent,

    BookDetailsModalComponent,
    BooksCardSharedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserRoutingModule, AdminRoutingModule,
    AvatarModule
  /*  AvatarModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
