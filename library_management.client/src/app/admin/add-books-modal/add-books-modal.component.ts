import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//declare var $: any;
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

  selectedBook: any;

  listOfBooks: any = [];

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  ngOnInit():void {
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
    console.log(this.bookForm);
  }

  decrement() {
    if (this.counterValue > 1) {
      this.counterValue--;
      this.bookForm.patchValue({
        qty: this.counterValue,
      });
      const qrArray = this.bookForm.get('qr') as FormArray;
      qrArray.removeAt(this.counterValue);
      console.log(this.bookForm);
    }
  }

  //updateQuantityValue(event: any) {
  //  const newValue = parseInt(event.target.value, 10);
  //  const deviceIdArray = this.addDeviceForm.get('deviceId') as FormArray;

  //  if (!isNaN(newValue)) {
  //    const currentValue = deviceIdArray.length;

  //    if (newValue > currentValue) {
  //      const elementsToAdd = newValue - currentValue;
  //      for (let i = 1; i <= elementsToAdd; i++) {
  //        this.pushValueIntoDeviceId('CGI-MOU-' + (this.laststoredcgi + i));
  //      }
  //    }

  //    else if (newValue < currentValue) {
  //      const elementsToRemove = currentValue - newValue;
  //      for (let i = 0; i < elementsToRemove; i++) {
  //        deviceIdArray.removeAt(deviceIdArray.length - 1);
  //      }
  //    }

  //    this.counterValue = newValue;
  //    this.addDeviceForm.get('qty')?.setValue(newValue);
  //  }
  //}

  stepperIncrement() {
    this.stepperIndex++;
  }

  stepperDecrement() {
    this.stepperIndex--;
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
          console.log(data);
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
        console.log(e);
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
    console.log(this.results);
    this.getBooks(this.results,"mic")
  }

  testing(event: any) {
    console.log("hello", event.target);
    if (this.selectedBook) {
      this.bookForm.patchValue({
        bookName: this.selectedBook.volumeInfo.title,
        authorName: this.selectedBook.volumeInfo.authors,
        img: this.selectedBook.volumeInfo.imageLinks.smallThumbnail,
        description: this.selectedBook.volumeInfo.description,
      });
    }
    console.log(this.bookForm);
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
}
