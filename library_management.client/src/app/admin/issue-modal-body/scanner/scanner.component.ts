import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeService, ScannerQRCodeResult, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { Location } from '@angular/common'; // Import Location service
import { IssueBookModalComponent } from '../../issue-book-modal/issue-book-modal.component';


declare var $: any;

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements AfterViewInit {
  bookqrcode: any;



  constructor(private router: Router, private location: Location, private qrcode: NgxScannerQrcodeService, private cdRef: ChangeDetectorRef 
) { }

  @ViewChild('action') action: NgxScannerQrcodeComponent | undefined;
  @ViewChild(IssueBookModalComponent) issueBookModal: IssueBookModalComponent | undefined;

  page: string = "issue";

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.page = navigation.extras.state['page'];
      console.log("page type",this.page);
    }
  }


  ngAfterViewInit() {
    const navigationState = this.router.getCurrentNavigation()?.extras?.state;

    // Fallback for scenarios where the above method doesn't capture the state
    this.page = navigationState ? navigationState['page'] : window.history.state.page;
    console.log(this.page);

    if (this.action) {
      this.action.start();
      this.action.data.subscribe((data: any) => {
        console.log('Scanned data:', data);
        this.bookqrcode = data[0].value;
        console.log('barcodeqr', this.bookqrcode);
        if (data.length > 0) {
          this.handleButtonClick();
        }
        this.cdRef.detectChanges(); // Manually trigger change detection
      }, (error: any) => {
        console.error('Error subscribing to scanner data:', error);
      });
    } else {
      console.error('NgxScannerQrcodeComponent not found');
    }

    //this.productId = {
    //  name: history.state.name,
    //  type: history.state.type,
    //  version: history.state.version
    //}

    
  }

  toggleScanner() {
    if (this.action) {
      if (this.action.isStart) {
        this.action.stop();
      } else {
        this.action.start();
      }
    }
  }

  handleButtonClick(): void {
    const isMobile = window.matchMedia('(max-width: 450px)').matches;
    if (isMobile) {
      this.router.navigate(['/admin/issue-mobile']); // Use the router to navigate
    } else {
      console.log("add book modal",this.bookqrcode);
      this.closePage();
      if (this.page == "add") {
        setTimeout(() => {
          this.openModalAdd();
        }, 950);
      } else {
        setTimeout(() => {
          this.openModal();
        }, 950);
      }
    }
  }

  openModalAdd() {
    $('#exampleModalCenter').modal('show');
  }
 


  openModal(): void {
    $('#exampleModalIssue').modal('show');
  }

  closePage(): void {
    if (this.action) {

      this.action.stop();
    }
    this.router.navigate(['/admin']);

      }

}
