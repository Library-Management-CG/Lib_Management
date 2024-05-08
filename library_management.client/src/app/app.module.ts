import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { MyBooksComponent } from './user/my-books/my-books.component';
import { ManageBooksComponent } from './admin/manage-books/manage-books.component';
import { IssueBookModalComponent } from './admin/issue-book-modal/issue-book-modal.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { IssueModalBodyComponent } from './admin/issue-modal-body/issue-modal-body.component';
import { IssueMobileComponent } from './admin/issue-mobile/issue-mobile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NavbarSharedComponent } from './shared/components/navbar-shared/navbar-shared.component';
import { AvatarModule } from 'ngx-avatars';
import { BookDetailsModalComponent } from './shared/components/book-details-modal/book-details-modal.component';
import { BooksCardSharedComponent } from './shared/components/books-card-shared/books-card-shared.component';
import { AddBooksModalComponent } from './admin/add-books-modal/add-books-modal.component';
import { SuccessModalComponent } from './shared/components/success-modal/success-modal.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';


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
    IssueBookModalComponent,
    SearchBoxComponent,
    IssueModalBodyComponent,
    IssueMobileComponent,
    //  FormsModule
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
