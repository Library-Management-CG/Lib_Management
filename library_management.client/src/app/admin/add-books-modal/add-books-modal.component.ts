import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
import { UserServiceService } from '../../shared/services/user-service.service';
declare var $: any;
declare var
  webkitSpeechRecognition:any
  ;

@Component({
  selector: 'app-add-books-modal',
  templateUrl: './add-books-modal.component.html',
  styleUrls: ['./add-books-modal.component.css']
})
export class AddBooksModalComponent {
  /*@ViewChild('exampleModalCenter') modal: any;*/
  stepperIndex: number = 0;
  counterValue: number = 0;
  video: any;
  canvas: any;
  capturedImage: string | undefined;

  selectedBook: any;

  listOfBooks: any = [];

  bookForm: FormGroup;

  addBook: any = {
    bookName: "",
    authorName: "",
    description: "",
    ISBN: "",
    img:""
  }

  qrArr: any;

  qrList: any[] = [];

  constructor(private formBuilder: FormBuilder, private exploreService: ExploreBooksService, private urserService: UserServiceService) {
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

  isAnyQrValueEmpty(): boolean {
    const hasEmptyValue = this.qrArr.some((qr: any) => qr.value === '');
    if (hasEmptyValue) {
      return true;
    }

    const qrSet = new Set();
    const hasDuplicates = this.qrArr.some((qr: any) => {
      if (qrSet.has(qr)) {
        return true; 
      }
      qrSet.add(qr); 
      return false;
    });
    if (hasDuplicates) {
      return true;
    }

    const hasMatch = this.qrArr.some((qr: any) => this.qrList.includes(qr));
    if (hasMatch) {
      return true;
    }

    return false;
  }


  ngOnInit(): void {
    this.exploreService.addBookPage$.subscribe(idx => {
      this.stepperIndex = idx;
    });


    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      }
    );


    this.exploreService.book$.subscribe(arr => {
      this.addBook = arr;
    })
    
    this.exploreService.qrCodes$.subscribe(arr => {
      this.qrArr = arr;
      console.log("qwertyuiopoiuytrewq", arr);
    })
    
    this.getQrList();
  }


  //showWebcam = true;
  isCaptured: boolean = false;

  showWebcam = true;
  isCameraExist = true;

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
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

  
  //reset() {
  //  this.stepperIndex = 0;
  //}

  //increment() {
  //  console.log("qwertyuiopoiuytrewq", this.addBook);

  //  this.counterValue++;
  //  this.bookForm.patchValue({
  //    qty: this.counterValue,
  //  });
  //  const qrArray = this.bookForm.get('qr') as FormArray;
  //  qrArray.push(this.formBuilder.control(''));
  //  //this.pushValueIntoDeviceId('CGI-MOU-' + (this.laststoredcgi + ele));
  //  //this.addDeviceForm.patchValue({
  //  //  qty: this.counterValue
  //  //});
  ////  console.log(this.bookForm);
  //}

  //decrement() {
  //  if (this.counterValue > 1) {
  //    this.counterValue--;
  //    this.bookForm.patchValue({
  //      qty: this.counterValue,
  //    });
  //    const qrArray = this.bookForm.get('qr') as FormArray;
  //    qrArray.removeAt(this.counterValue);
  //  //  console.log(this.bookForm);
  //  }
  //}

  stepperIncrement() {
    this.stepperIndex++;
    this.exploreService.setaddBookPage(this.stepperIndex);
  //  console.log(this.stepperIndex);
  }

  stepperDecrement() {
    this.stepperIndex--;
    this.exploreService.setaddBookPage(this.stepperIndex);
  //  console.log(this.stepperIndex);
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
          this.listOfBooks = data.items;
          
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
      vSearch.onresult = (e:any) => {
        //console.log(e);
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
    this.getBooks(this.results,"mic")
  }

  testing(event: any) {
    //console.log("hello", event.target);
    if (this.selectedBook) {
      this.bookForm.patchValue({
        bookName: this.selectedBook.volumeInfo.title,
        authorName: this.selectedBook.volumeInfo.authors,
        img: this.selectedBook.volumeInfo.imageLinks.smallThumbnail,
        description: this.selectedBook.volumeInfo.description,
      });
    }
    //console.log(this.bookForm);
    return;
  }

  changeQty() {
    //console.log(this.counterValue);
    
   
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

  //  console.log(this.bookForm);
  }

  Reset() {
    $('#exampleModalCenter').modal('hide');
    this.exploreService.resetBook();
    //this.exploreService.resetQrCode();
    //this.stepperIndex = 0;
    this.exploreService.setaddBookPage(0);
    
  }

  Cancel() {
    $('#exampleModalCenter').modal('hide');
    this.exploreService.resetBook();
    //this.exploreService.resetQrCode();
    this.exploreService.setaddBookPage(0);
  }

  openModal(): void {
    $('#successadd').modal('show');
  }

  addBookRequest() {
    //console.log("add book post req", this.addBook);
    

    var book = {
      bookName: this.addBook.bookName,
      authorName: this.addBook.authorName,
      img: this.addBook.img,
      description: this.addBook.description,
      ISBN: this.addBook.ISBN,
      qty: this.qrArr.length,
      qr: this.qrArr,
      LoggedIn:'1c7d283a-c22b-45ca-8f9d-1c1c3dd16e20',
    }

    //console.log("before we post", book);

    this.urserService.addNewBook(book).subscribe(
      (data: any[]) => {
        this.exploreService.settotalbooks(data);

        console.error('Error posted');
        this.Reset();
        this.openModal();
        this.exploreService.setSuccessIssue(true);
   
      },
      (error: any) => {
        this.exploreService.resetQrCode();
        this.Reset();
        console.error('Error posting:', error);

      }
    );
  }

  Close() {
    this.exploreService.resetBook();
    this.exploreService.resetQrCode();
    this.exploreService.setaddBookPage(0);
  }

  getQrList() {
    this.urserService.getQrList().subscribe(
      (data: any[]) => {
        this.qrList = data;
        //console.log("qrlistttttttttt",data);
      },
      (error: any) => {
        console.error('Error posting:', error);
      }
    );
  }
}

