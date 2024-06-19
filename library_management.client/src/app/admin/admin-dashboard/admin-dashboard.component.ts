import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AdminServiceService } from '../../shared/services/Admin-service .service';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  selectedBook: any;
  dataLoaded = false;
  placeholderArray = new Array(10);
  isMobile = false;
  totalbooks: any;
  issuebooks: any;
  constructor(private router: Router, private AdminService: AdminServiceService, private explorebook: ExploreBooksService) { }

  handleButton() {
    if (window.innerWidth <= 767) {

      this.router.navigate(['/admin/add-book-mobile']);
    } else {

      this.openModalAdd();
    }
  }
  handlesize() {
    if (window.innerWidth <= 500) {
      this.isMobile = true;
    }
  }


  openModaldesc(book: any) {
    this.selectedBook = book;
  }


  openModalAdd(): void {

    $('#exampleModalCenter').modal('show');
  }

  counti: number[] = [];


  mostPopularBooks = [];
  
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();


  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );
    this.explorebook.totalBook$.subscribe(totalbooks => {
      this.gettotalcount();
      this.getissuecount();
      this.topChoicesBookData();

    });
    
    this.handlesize();
  }

  gettotalcount() {
    this.AdminService.getTotalBooks().subscribe(
      (data) => {
        this.totalbooks = data;
        this.checkDataLoaded();

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  
  }

  getissuecount() {
    this.AdminService.getissueBooks().subscribe(
      (data) => {
        this.issuebooks = data;
        this.checkDataLoaded();


      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }
  topChoicesBookData() {
    this.AdminService.topChoicesBook().subscribe(
      (data) => {
        this.mostPopularBooks = data;
        this.checkDataLoaded();


        //console.log(data);

      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }



  takeSnapshot(): void {
    this.trigger.next();

  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.getPicture.emit(webcamImage);
    this.showWebcam = false;
    //console.log(webcamImage);
    const arr = webcamImage.imageAsDataUrl.split(",");
    //console.log(arr);
    //const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    //const file: File = new File([u8arr], this.imageName, { type: this.imageFormat })
    //console.log(file);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  handleButtonClick(): void {
   
      this.router.navigate(['admin/issue-mobile-scanner']); 
   
  }

  openModal(): void {

    $('#exampleModalIssue').modal('show');
  }


  checkDataLoaded() {
    if (this.totalbooks >=0 && this.issuebooks >= 0 && this.mostPopularBooks.length > 0) {
      this.dataLoaded = true;
    }
  }
 

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  openModalissue(): void {

    $('#success').modal('show');
  }

}

