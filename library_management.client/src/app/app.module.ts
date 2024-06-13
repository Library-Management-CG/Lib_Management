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
import { IssueBookModalComponent } from './admin/issue-book-modal/issue-book-modal.component';
import { SearchBoxComponent } from './search-box/search-box.component';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessControlWebComponent } from './admin/access-control-web/access-control-web.component';
import { AccessControlMobileComponent } from './admin/access-control-mobile/access-control-mobile.component';
import { AssignPermissionModalComponent } from './admin/assign-permission-modal/assign-permission-modal.component';
import { ListPanelComponent } from './admin/access-control-web/list-panel/list-panel.component';
import { PermissionPanelComponent } from './admin/access-control-web/permission-panel/permission-panel.component';
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
import { StylePaginatorDirective } from './admin/manage-books/outer-table/style-paginator.directive';
import { InnerTableComponent } from './admin/manage-books/inner-table/inner-table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentsModalComponent } from './admin/manage-books/inner-table/comments-modal/comments-modal.component';
import { ArchiveModalComponent } from './admin/manage-books/inner-table/archive-modal/archive-modal.component';
import { WebcamModule } from 'ngx-webcam';
import { AddBookMobileComponent } from './admin/add-book-mobile/add-book-mobile.component';
import { AddBookCommonComponent } from './admin/add-book-common/add-book-common.component';
import { MobileAccordianComponent } from './admin/access-control-mobile/mobile-accordian/mobile-accordian.component';
import { AssignPermissionSubPartComponent } from './admin/assign-permission-modal/assign-permission-sub-part/assign-permission-sub-part.component';
import { TimeRemainingModalComponent } from './user/time-remaining-modal/time-remaining-modal.component';
import { RatingModalComponent } from './user/rating-modal/rating-modal.component';
import { MyBooksMobileComponent } from './user/my-books-mobile/my-books-mobile.component';
import { MyBooksCardMobileComponent } from './shared/components/my-books-card-mobile/my-books-card-mobile.component';
import { AdminNameCardComponent } from './admin/access-control-web/admin-name-card/admin-name-card.component';
import { CaptureComponent } from './admin/capture/capture.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NewExploreBooksComponent } from './user/new-explore-books/new-explore-books.component';
import { RatingDropdownComponent } from './user/rating-dropdown/rating-dropdown.component';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { ModalContentComponent } from './shared/components/modal-content/modal-content.component';
import { ScannerComponent } from './admin/issue-modal-body/scanner/scanner.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { CaptureMobileComponentComponent } from './admin/capture/capture-mobile-component/capture-mobile-component.component';
import { MyBooksTableComponent } from './user/my-books/my-books-table/my-books-table.component';
import { SingleCommentComponent } from './admin/manage-books/inner-table/comments-modal/single-comment/single-comment.component';
import { TurncatePipe } from './turncate.pipe';
import { SuccessMobileComponent } from './shared/success-mobile/success-mobile.component';
import { RatingInnerContentComponent } from './user/rating-dropdown/rating-inner-content/rating-inner-content.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RevokeBookModalComponent } from './admin/manage-books/inner-table/revoke-book-modal/revoke-book-modal.component';
import { RevokePermissionModalComponent } from './shared/components/revoke-permission-modal/revoke-permission-modal.component';
import { SuccessAddBookComponent } from './admin/success-add-book/success-add-book.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';



LOAD_WASM().subscribe();
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
    AdminNameCardComponent,
    NavbarSharedComponent,
    OuterTableComponent,
    ManageBooksComponent,
    StylePaginatorDirective,
    InnerTableComponent,
    CommentsModalComponent,
    ArchiveModalComponent,
    BooksCardSharedComponent,
    AddBookMobileComponent,
    AddBookCommonComponent,
    MobileAccordianComponent,
    AssignPermissionSubPartComponent,
    TimeRemainingModalComponent,
    RatingModalComponent,
    MyBooksMobileComponent,
    MyBooksCardMobileComponent,
    BooksCardSharedComponent,
    IssueBookModalComponent,
    SearchBoxComponent,
    IssueModalBodyComponent,
    IssueMobileComponent,
    NewExploreBooksComponent,
    RatingDropdownComponent,
    //  FormsModule
    AddBookCommonComponent,
    CaptureComponent,
    MyBooksCardMobileComponent,
    CaptureComponent,
    ModalContentComponent,
    MobileAccordianComponent,
    ScannerComponent,
    CaptureMobileComponentComponent,
    MyBooksTableComponent,
    SingleCommentComponent,
    TurncatePipe,
    SuccessMobileComponent,
    RatingInnerContentComponent,
    RevokeBookModalComponent,
    RevokePermissionModalComponent,
    SuccessAddBookComponent,
    SpinnerComponent    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    UserRoutingModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    WebcamModule,
    ImageCropperModule,
    MatBottomSheetModule,
    MatListModule,
    ImageCropperModule,
    NgxScannerQrcodeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  /*  AvatarModule*/
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  //exports: [StylePaginatorDirective]
})
export class AppModule { }

export function playerFactory() {
  return player;
}
