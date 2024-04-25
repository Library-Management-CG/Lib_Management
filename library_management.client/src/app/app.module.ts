import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';

import { AdminRoutingModule } from './admin/admin-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { MyBooksComponent } from './user/my-books/my-books.component';
import { ManageBooksComponent } from './admin/manage-books/manage-books.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    UserComponent,
    MyBooksComponent,
    ManageBooksComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserRoutingModule, AdminRoutingModule,
  /*  AvatarModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
