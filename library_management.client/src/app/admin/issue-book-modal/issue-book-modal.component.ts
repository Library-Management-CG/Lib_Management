import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-issue-book-modal',
  templateUrl: './issue-book-modal.component.html',
  styleUrls: ['./issue-book-modal.component.css']
})
export class IssueBookModalComponent {
  @Input() bookqrcode: any = '' ;
  users: any[] = []; // Array to store users
  selectedOption: any; // Variable to store the selected option
  placeholder: string = "Search User"; // Initial placeholder value
  selectedUser: number | undefined;
 
  returnDateInputValue: string;
  issueDateInputValue: string;
  bookqr: any;
  ngOnChanges() {
    this.bookqr = this.bookqrcode;
    console.log('Got  : ', this.bookqr);
    this.value(this.bookqr);
  }

  constructor() {
    const currentDate = new Date();

    this.returnDateInputValue = this.formatDate(currentDate);

    this.issueDateInputValue = this.formatDate(currentDate);


    this.users = [
      { id: 1, name: 'Brooklyn Simmons' },
      { id: 2, name: 'Courtney Henry' },
      { id: 3, name: 'Annette Black' }
    ];
   

  }

  value(bookqr:any) {
    console.log('qrrrrr:', bookqr);

  }

  

  // Function to handle selection of an option
  onSelectOption(event: any) {
    // Access the selected option using event.target.value
    console.log('Selected option:', event.target.value);

    // Update the placeholder to empty string when an option is selected
    this.placeholder = '';
    // You can perform additional actions here, such as updating other variables or making API calls
  }

  onClearSelection() {
    this.selectedOption = null;
    this.placeholder = 'Search User';
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
  }

  // Function to format the date as YYYY-MM-DD (required format for input type="date")
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

