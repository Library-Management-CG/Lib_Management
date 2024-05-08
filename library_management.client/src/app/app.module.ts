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
import { AddBooksModalComponent } from './admin/add-books-modal/add-books-modal.component';
import { SuccessModalComponent } from './shared/components/success-modal/success-modal.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AccessControlWebComponent } from './admin/access-control-web/access-control-web.component';
import { AccessControlMobileComponent } from './admin/access-control-mobile/access-control-mobile.component';
import { AssignPermissionModalComponent } from './admin/assign-permission-modal/assign-permission-modal.component';
import { ListPanelComponent } from './admin/access-control-web/list-panel/list-panel.component';
import { PermissionPanelComponent } from './admin/access-control-web/permission-panel/permission-panel.component';
import { AdminNameCardComponent } from './admin/access-control-web/admin-name-card/admin-name-card.component';

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
    AddBooksModalComponent,
    SuccessModalComponent,
    NavbarSharedComponent,
   
    BookDetailsModalComponent,
    BooksCardSharedComponent,
    AccessControlWebComponent,
    AccessControlMobileComponent,
    AssignPermissionModalComponent,
    ListPanelComponent,
    PermissionPanelComponent,
    AdminNameCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserRoutingModule, AdminRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgSelectModule,
    FormsModule,
    AvatarModule
  /*  AvatarModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function playerFactory() {
  return player;
}
