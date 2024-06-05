import { ChangeDetectorRef, Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AdminServiceService } from '../../shared/services/Admin-service .service';
import { ExploreBooksService } from '../../shared/services/ExploreBooksService';
import { FormBuilder, FormGroup,FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-issue-modal-body',
  templateUrl: './issue-modal-body.component.html',
  styleUrls: ['./issue-modal-body.component.css'],
})
export class IssueModalBodyComponent {
  @Input() qrvalue: any;
  users: any[] = []; // Array to store users
  selectedOption: any; // Variable to store the selected option
  placeholder: string = "Search User"; // Initial placeholder value
  selectedUser: number | undefined;
  //issueDateInput: string | undefined; // Variable to store the current date for issue date input
  //returnDateInput: string | undefined; // Variable to store the current date for return date input
  returnDateInputValue: string;
  issueDateInputValue: string;
  totalusers: any;
  bookqr: any;
  mappedBook: any;
  issueBookForm!: FormGroup;
  showErrorMessage = false;

  constructor(private AdminService: AdminServiceService, private cdr: ChangeDetectorRef, private exploreBooksService: ExploreBooksService, private fb: FormBuilder) {
    // Initialize users array with dummy data (replace with actual data)
    const currentDate = new Date();

    // Set the return date input value to the current date
    this.returnDateInputValue = this.formatDate(currentDate);

    // Set the issue date input value to the current date
    this.issueDateInputValue = this.formatDate(currentDate);


    this.users = [
      { id: 1, name: 'Brooklyn Simmons' },
      { id: 2, name: 'Courtney Henry' },
      { id: 3, name: 'Annette Black' }
      // Add more users as needed
    ];
    //const currentDate = new Date();
    //this.issueDateInput = currentDate.toISOString().split('T')[0];

    //// Add 15 days to the current date for returnDateInput
    //currentDate.setDate(currentDate.getDate() + 15);
    //this.returnDateInput = currentDate.toISOString().split('T')[0];

  }


  createForm() {
    this.issueBookForm = this.fb.group({

      createdBy: [''],
      issueTo: ['', Validators.required],
      description: ['', Validators.required],
      bookQrMappingId: ['']

    });
  }



  // Function to handle selection of an option
  onSelectOption(event: any) {
    // Access the selected option using event.target.value
    console.log('Selected option:', event.target.value);
    // Update the placeholder to empty string when an option is selected
    this.placeholder = '';
    // You can perform additional actions here, such as updating other variables or making API calls
  }

  // Function to handle clearing of selection
  onClearSelection() {
    // Reset the selected option
    this.selectedOption = null;
    // Reset the placeholder to its initial value when the selection is cleared
    this.placeholder = 'Search User';
    // You can perform additional actions here if needed
  }
  openDatePicker(input: HTMLInputElement) {
    input.click();

  }
  ngOnInit(): void {
    // Get the current date
    const currentDate = new Date();

    // Add 15 days to the current date
    const returnDate = new Date();
    returnDate.setDate(currentDate.getDate() + 15);

    // Set the return date input value to the modified date
    this.returnDateInputValue = this.formatDate(returnDate);

    // Set the issue date input value to the current date
    this.issueDateInputValue = this.formatDate(currentDate);
    this.getUsers();


    this.exploreBooksService.mappedBook$.subscribe(mappedBook => {
      if (mappedBook) {
        this.mappedBook = mappedBook;
        this.cdr.detectChanges();
      }
    });
    this.createForm();

  }



  // Function to format the date as YYYY-MM-DD (required format for input type="date")
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getUsers() {
    this.AdminService.getUsers().subscribe(
      (data) => {
        this.totalusers = data;
        //console.log('kdsbvsbdvj', this.mappedBook);

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  //ngOnChanges(changes: SimpleChanges) {
  //  if (changes['mappedBook']) {
  //    console.log('kdsbvsbdvj', this.mappedBook);
  //  }
  //}
  ngOnChanges() {
    this.bookqr = this.qrvalue;
    if (this.bookqr) {
      console.log('cbjsbjbsdjbj  : ', this.qrvalue);

      this.value(this.qrvalue);
    }
  }
  value(bookqr: any) {
    console.log('thisis my modalbidy:', bookqr);

    const revokeParams = {
      qrNumber: bookqr,
    };
    this.AdminService.getBookDetails(revokeParams).subscribe(
      (data: any) => {
        this.mappedBook = data;
        this.exploreBooksService.setMappedBook(this.mappedBook);

        this.cdr.detectChanges();

        console.log('mapped', this.mappedBook);

      },
      (error: any) => {
        console.log("User not found");
      }
    );
  }
  //mappedBook(arg0: string, mappedBook: any) {
  //    throw new Error('Method not implemented.');
  //}
  hideErrorMessage() {
    this.showErrorMessage = false;
  }

  nextValidation(): boolean {
    var isUserName = this.issueBookForm.get('issueTo')?.value != null;
    var isDescription = this.issueBookForm.get('description')?.value != '';

    return isUserName && isDescription;
  }

  next() {

    if (this.nextValidation() == true) {
      this.hideErrorMessage();
      this.showErrorMessage = false;

    }
    else {
      this.showErrorMessage = true;
    }

  }


  onSubmit() {
    this.issueBookForm.get('createdBy')?.setValue('1C7D283A-C22B-45CA-8F9D-1C1C3DD16E20');
    this.issueBookForm.get('bookQrMappingId')?.setValue(this.mappedBook.bookQrMappingId);

    console.log(this.issueBookForm.value);

    if (this.issueBookForm.valid && !this.showErrorMessage) {
      //console.log(this.addDeviceForm.value);
      console.log(this.issueBookForm.value);

      this.AdminService.issueBook(this.issueBookForm.value).subscribe(
        response => {
          console.log('data posted successfully', response);
          this.exploreBooksService.settotalbooks(response);

          //alert('Book Issued Successfully!');

        },
        error => {
          console.error('error posting data Harleen', error);

        }
      );
    }
    else {
      this.showErrorMessage = true;
      console.error("Harleen");

    }


  }
     
      
    }

  

