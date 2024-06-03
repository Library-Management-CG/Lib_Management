import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent {
  croppedImage: any = '';

  @Output() getPicture = new EventEmitter<WebcamImage>();
  constructor(private sanitizer: DomSanitizer) {}
  check() {
    console.log("hello");
  }
  save() {
    var finalImg = this.srcc;
    console.log(this.updatedSRCC);
    if (this.updatedSRCC != "") {
      finalImg = this.updatedSRCC;
    }
    this.getPicture.emit(finalImg);
    $(document).ready(function () {
      $('#webcam').modal('hide');
    });
  }
  close() {
    $(document).ready(function () {
      $('#webcam').modal('hide');
      });
  }

  blobToDataURL(blobUrl: string): Promise<string> {
  // Fetch the blob from the Blob URL
  return fetch(blobUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch blob: ${response.statusText}`);
      }
      return response.blob();
    })
    .then(blob => {
      // Create a FileReader to read the Blob
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read the Blob as Data URL'));
        };
        reader.readAsDataURL(blob);
      });
    });
}

  updatedSRCC: any = "";

  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl != null || event.objectUrl != undefined) {
      //var reader = new FileReader();
      //var source = reader.readAsDataURL(event.objectUrl);
      
      //this.srcc = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
      this.blobToDataURL(event.objectUrl).then(dataUrl => {
        console.log('Data URL:', dataUrl);
        this.updatedSRCC = dataUrl
      }).catch(error => {
        console.error('Error:', error);
      });
      console.log(this.srcc);
    }
    console.log(this.srcc);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
    
  }
  loadImageFailed() {
    // show message
  }


  aspectRatioWidth: number = 3; // For example, 16:9 aspect ratio
  aspectRatioHeight: number = 4;
  calculateHeight(width: number): number {
    return (width * this.aspectRatioHeight) / this.aspectRatioWidth;
  }
  
  
  showWebcam = false;
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
    this.srcc = '';
    this.updatedSRCC = '';
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  //@ViewChild("image")
  //private _image: HTMLImageElement;

  //@ViewChild("cropper", undefined)

  srcc: any = '';
  handleImage(webcamImage: WebcamImage) {
    //this.imageChangedEvent = this._cropper.imageURL ? (webcamImage.imageAsDataUrl) : String;
    //      webcamImage.imageAsDataUrl;
    this.getPicture.emit(webcamImage);
    this.showWebcam = false;
    console.log(webcamImage);
    this.srcc = webcamImage.imageAsDataUrl;
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
