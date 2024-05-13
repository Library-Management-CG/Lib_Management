import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  //ngOnInit(): void {
  //  $(document).ready(function () {
  //    $('#exampleModalCenter').modal('show');
  //  });
  //}

  constructor(private router: Router) { }

  handleButtonClick() {
    if (window.innerWidth <= 767) {
      // Navigate to the desired page if screen size is mobile or less
      this.router.navigate(['/admin/add-book-mobile']);
    } else {
      // Open the modal if screen size is larger than mobile
      this.openModal();
    }
  }
  counti: number[] = [];
  openModal(): void {
    // Assuming you're using Bootstrap modal
    // You need to include Bootstrap JS in your project
    // You can use jQuery to trigger the modal
    $('#exampleModalCenter').modal('show');
  }

  //ngOnInit(): void {
  //  //$(document).ready(function () {
  //  //  $('#exampleModalCenter').modal('show');
  //  //});
  //    for (let i = 1; i <= 10; i++) {
  //        this.counti.push(i);
  //    }
  //}
  mostPopularBooks = [

    {
      title: 'The Invisible Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 4,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'The Invisible',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 3,
      numberOfPeopleReviewed: 28
    },



    {
      title: 'The Cloud',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 1,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'The ok',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 2,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'my',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 3,
      numberOfPeopleReviewed: 28
    },

    {
      title: 'daryl',
      author: 'Daryl Bishop & Nick Smith',
      imageUrl: '../../../assets/icons/Book - The Invisible Cloud.svg',
      ratingUrl: 5,
      numberOfPeopleReviewed: 28
    },


  ];
  
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

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}

