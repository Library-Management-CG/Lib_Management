import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject, Subscription } from 'rxjs';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
import { UserServiceService } from '../../shared/services/user-service.service';

declare var $: any;
declare var
  webkitSpeechRecognition: any
  ;

@Component({
  selector: 'app-add-book-common',
  templateUrl: './add-book-common.component.html',
  styleUrls: ['./add-book-common.component.css']
})
export class AddBookCommonComponent {

  book$ = this.exploreService.book$;

  /*@ViewChild('exampleModalCenter') modal: any;*/
  @Input() stepperIndex: number = 0;

  qrCodes: any[] = [];

  @Input() qrList: any[] = [];

  qrExist: boolean = false;
  qrSame: boolean = false; 

  //stepperIndex: number = 0;
  counterValue: number = 0;
  video: any;
  canvas: any;
  capturedImage: string | undefined;

  selectedBook: any;

  listOfBooks: any = [];

  bookForm: FormGroup;

  captureImg:any=""
  getPicture(event: any) {
    this.bookForm.patchValue({
      img: event
    });

    //this.captureImg = event;
    this.exploreService.setImg(event);
    console.log("hello",this.capturedImage);
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private exploreService: ExploreBooksService, private urserService: UserServiceService) {
    this.bookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      authorName: ['', Validators.required],
      img: ['', [Validators.required]],
      description: ['', Validators.required],
      qty: ['0'],
      qr: this.formBuilder.array([]),
      //location: [this.locationId]
      //CreatedBy: [this.loggedUser.id]
    });
  }
  //constructor(private modalService: NgbModal) { } // Inject NgbModal service if you're using NgbModal

  //dismissModal() {
  //  this.modalService.dismissAll(); // Close all modals
  //}

  //ngOnInit(): void {
  //  $(document).ready(function () {
  //    $('#success').modal('show');
  //  });
  //}

  onDoneClicked() {
    this.stepperIndex = 0;
  }
  

  ngOnInit(): void {
    this.exploreService.addBookPage$.subscribe(idx => {
      this.stepperIndex = idx;
    });

    this.exploreService.qrCodes$.subscribe(qrCodes => {
      this.qrCodes = qrCodes;
      this.counterValue = this.qrCodes.length;
    });

    this.exploreService.setQrCodes(this.qrCodes);

    //this.isCaptured = false;
    //this.video = document.getElementById('video');
    //this.canvas = document.getElementById('canvas');
    //navigator.mediaDevices.getUserMedia({ video: true })
    //  .then(stream => {
    //    this.video.srcObject = stream;
    //  })
    //  .catch(err => console.error('Error accessing camera: ', err));



    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );


    //this.book$.subscribe(book => {
    //  console.log(book);
    //});


    this.exploreService.book$.subscribe(book => {
      if (book) {
        this.bookForm.patchValue({
          bookName: book.bookName,
          authorName: book.authorName,
          img: book.img,
          description: book.description
        });
        this.selectedBook = book.bookName;
      }
    });

    var api = "https://www.googleapis.com/books/v1/volumes?q=default";

    //setTimeout(() => {
    fetch(api)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        data.items = data.items.filter((book:any) =>
          book.volumeInfo.industryIdentifiers && 
          book.volumeInfo.industryIdentifiers.some((id:any) => id.type === "ISBN_13")
        );
        this.listOfBooks = data.items;

      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });

    //this.exploreService.qrExist$.subscribe(arr => {
    //  this.qrExist = arr;
    //})
    
  }

  openWebcam() {
    //if (window.innerWidth <= 767) {

     // this.router.navigate(['/admin/add-book-mobile']);
    //} else {

      this.openModal();
    //}
  }


  //showError(qr: string, index: number): boolean {
  //  // Check if the current QR code exists in the list
  //  this.qrExist = this.qrCodes.includes(qr);
  //  console.log(this.qrCodes);

  //  // Check for duplicates
  //  const qrSet = new Set();
  //  const hasDuplicates = this.qrCodes.some((code: string, i: number) => {
  //    if (qrSet.has(code)) {
  //      // Check if the duplicate is at the same index
  //      return i !== index;
  //    }
  //    qrSet.add(code); // Add code to the set
  //    return false;
  //  });

  //  this.qrSame = hasDuplicates;

  //  return this.qrExist || this.qrSame;
  //}


  showError(qr: string): boolean {
    this.qrExist = this.qrList.includes(qr);
    console.log(this.qrCodes);

    //const qrSet = new Set();
    //const hasDuplicates = this.qrCodes.some((code: string) => {
    //  if (qrSet.has(code)) {
    //    return true; // Found a duplicate
    //  }
    //  qrSet.add(code); // Add code to the set
    //  return false;
    //});


    //this.qrSame = hasDuplicates;

    return this.qrExist
   // || this.qrSame;
  }

  openModal(): void {

    $('#webcam').modal('show');
  }

  //showWebcam = true;
  isCaptured: boolean = false;

  showWebcam = true;
  isCameraExist = true;

  errors: WebcamInitError[] = [];

  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();


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
    //this.getPicture.emit(webcamImage);
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  OpenCapture() {
    // Your capture logic here
    this.isCaptured = true;
  }


  capture() {
    const context = this.canvas.getContext('2d');
    context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    this.capturedImage = this.canvas.toDataURL('image/png');

    if (this.capturedImage) {
      localStorage.setItem('capturedImage', this.capturedImage);
    }
  }

  clear() {
    // Clear the captured image from local storage
    localStorage.removeItem('capturedImage');
    this.isCaptured = false;
    //this.capturedImage = null;
    this.capturedImage = undefined;
  }


  reset() {
    this.stepperIndex = 0;
  }

  increment() {
    this.counterValue++;
    this.bookForm.patchValue({
      qty: this.counterValue,
    });
    const qrArray = this.bookForm.get('qr') as FormArray;
    qrArray.push(this.formBuilder.control(''));
    //this.pushValueIntoDeviceId('CGI-MOU-' + (this.laststoredcgi + ele));
    //this.addDeviceForm.patchValue({
    //  qty: this.counterValue
    //});
    /* console.log(this.bookForm);*/


    this.exploreService.addQrCode({ value: '' });
  //  console.log("array size", this.qrCodes);
  }

  decrement(index: number) {
    if (this.qrCodes.length > 1) {
      if (this.counterValue > 1) {
        this.counterValue--;
        this.bookForm.patchValue({
          qty: this.counterValue,
        });
        const qrArray = this.bookForm.get('qr') as FormArray;
        qrArray.removeAt(this.counterValue);
      //  console.log(this.bookForm);
      }



      this.exploreService.removeQrCode(index);
    }
  //  console.log("array size", this.qrCodes);
  }

 
  stepperIncrement() {
    this.stepperIndex++;
    this.exploreService.setaddBookPage(this.stepperIndex);
  }

  stepperDecrement() {
    this.stepperIndex--;
    this.exploreService.setaddBookPage(this.stepperIndex); 
  }

  getBooks(event: any, type: string) {
    var bookName = '';
    if (type == "key") {
      bookName = event.term;
    } else {
      bookName = event;
    }

    var api = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(bookName);

    //setTimeout(() => {
    fetch(api)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        //this.listOfBooks = data.items;
        //console.log("he;lloo",this.listOfBooks);
        //this.listOfBooks = this.listOfBooks.volumeInfo.industryIdentifiers.some((id: any) => id.type === "ISBN_13")
        this.listOfBooks = data.items.filter((book:any) => {
          if (book.volumeInfo && book.volumeInfo.industryIdentifiers) {
            return book.volumeInfo.industryIdentifiers.some((id:any) => id.type === "ISBN_13");
          }
          return false;
        });
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
    ///* }, 500);*/

  }

  name = 'Angular';

  results: any;

  startListening() {
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      vSearch.onresult = (e: any) => {
        //console.log(e);
        this.selectedBook = e;
        // voiceHandler.value = e?.results[0][0]?.transcript;
        this.results = e.results[0][0].transcript;
        this.getResult();
        // console.log(this.results);
        vSearch.stop();
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
    
  }

  getResult() {
    //console.log(this.results);
    this.getBooks(this.results, "mic")
  }

  testing(event: any) {
    //console.log("hello", event.target);
    //console.log("helloooo", this.listOfBooks);
    //console.log("helloooo", this.selectedBook);
    

    this.exploreService.setBook({
      bookName: this.selectedBook.volumeInfo.title ?? null,
      authorName: this.selectedBook.volumeInfo.authors ? this.selectedBook.volumeInfo.authors : null,
      img: this.selectedBook.volumeInfo.imageLinks?.smallThumbnail ?? null,
      description: this.selectedBook.volumeInfo.description ?? null,
      ISBN: this.selectedBook.volumeInfo.industryIdentifiers?.find((id: any) => id.type === "ISBN_13")?.identifier ?? null,
    });


    if (this.selectedBook) {
      this.bookForm.patchValue({
        bookName: this.selectedBook.volumeInfo.title,
        authorName: this.selectedBook.volumeInfo.authors,
        img: this.selectedBook.volumeInfo.imageLinks.smallThumbnail,
        description: this.selectedBook.volumeInfo.description,
      });
      this.captureImg = '';
      console.log("book selected", this.bookForm);
      this.selectedBook = this.selectedBook.volumeInfo.title;
    }


    
    return;
  }

  changeQty() {
    console.log(this.counterValue);


    if (this.counterValue === this.bookForm.get('qty')?.value) {
      return;
    } else if (this.counterValue > this.bookForm.get('qty')?.value) {

      const qrArray = this.bookForm.get('qr') as FormArray;
      const difference = this.counterValue - this.bookForm.get('qty')?.value;
      for (let i = 0; i < difference; i++) {
        qrArray.push(this.formBuilder.control(''));
      }

    } else {

      const qrArray = this.bookForm.get('qr') as FormArray;
      const difference = this.bookForm.get('qty')?.value - this.counterValue;
      for (let i = 0; i < difference; i++) {
        qrArray.removeAt(qrArray.length - 1);
      }

    }

    this.bookForm.patchValue({
      qty: this.counterValue,
    });

    console.log(this.bookForm);
  }

  Scanner(index: any) {
    $('#exampleModalCenter').modal('hide');
    const navigationExtras: NavigationExtras = {
      state: {
        page: "add",
        idx:index,
      }
    };

    this.router.navigate(['/admin/issue-mobile-scanner'], navigationExtras);
  }
  routeBasedOnScreenSize() {
      if (window.innerWidth <= 765) {
        this.router.navigate(['admin/add-book-scanner']);
      } else {
        this.openWebcam();

      }
  }

 
}


