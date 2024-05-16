import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AdminServiceService } from '../../shared/services/Admin-service .service';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  totalbooks: any;
  issuebooks: any;
  constructor(private router: Router, private AdminService: AdminServiceService) { }

  handleButton() {
    if (window.innerWidth <= 767) {

      this.router.navigate(['/admin/add-book-mobile']);
    } else {

      this.openModal();
    }
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
    this.gettotalcount();
    this.getissuecount();
    this.topChoicesBookData();
  }

  gettotalcount() {
    this.AdminService.getTotalBooks().subscribe(
      (data) => {
        this.totalbooks = data;
        
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
        console.log(data);

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
    console.log(webcamImage);
    const arr = webcamImage.imageAsDataUrl.split(",");
    console.log(arr);
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
    const isMobile = window.matchMedia('(max-width: 450px)').matches;
    if (isMobile) {
      this.router.navigate(['/admin/issue-mobile']); // Use the router to navigate
    } else {
      this.openModal();
    }
  }

  openModal(): void {

    $('#exampleModalIssue').modal('show');
  }

 

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}

