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

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BookCardsComponent } from './shared/components/book-cards/book-cards.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OuterTableComponent } from './admin/manage-books/outer-table/outer-table.component';
import { ManageBooksComponent } from './admin/manage-books/manage-books.component';
import { StylePaginatorDirective } from './admin/manage-books/outer-table/style-paginator.directive';
import { InnerTableComponent } from './admin/manage-books/inner-table/inner-table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentsModalComponent } from './admin/manage-books/inner-table/comments-modal/comments-modal.component';
import { ArchiveModalComponent } from './admin/manage-books/inner-table/archive-modal/archive-modal.component';
import { RevokeBookModalComponent } from './admin/manage-books/inner-table/revoke-book-modal/revoke-book-modal.component';
import { FormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    UserComponent,
    MyBooksComponent,
    ManageBooksComponent,

    NavbarComponent,
    BookCardsComponent,
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
    AdminNameCardComponent,
    NavbarSharedComponent,
    OuterTableComponent,
    ManageBooksComponent,
    StylePaginatorDirective,
    InnerTableComponent,
    CommentsModalComponent,
    ArchiveModalComponent,
    RevokeBookModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    UserRoutingModule, AdminRoutingModule, BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
    UserRoutingModule, AdminRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgSelectModule,
    FormsModule,
    AvatarModule
  /*  AvatarModule*/
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function playerFactory() {
  return player;
}
