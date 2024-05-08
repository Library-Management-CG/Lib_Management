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
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BookCardsComponent } from './shared/components/book-cards/book-cards.component';
import { IssueBookModalComponent } from './admin/issue-book-modal/issue-book-modal.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { IssueModalBodyComponent } from './admin/issue-modal-body/issue-modal-body.component';
import { IssueMobileComponent } from './admin/issue-mobile/issue-mobile.component';



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
    UserRoutingModule,
    AdminRoutingModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
