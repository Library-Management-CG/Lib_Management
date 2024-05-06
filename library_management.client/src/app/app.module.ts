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
import { AddBooksModalComponent } from './admin/add-books-modal/add-books-modal.component';
import { SuccessModalComponent } from './shared/components/success-modal/success-modal.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgSelectModule } from '@ng-select/ng-select';
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
    SuccessModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserRoutingModule, AdminRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgSelectModule,
    FormsModule
  /*  AvatarModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function playerFactory() {
  return player;
}
