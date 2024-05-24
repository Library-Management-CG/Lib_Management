import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-issue-modal-body',
  templateUrl: './issue-modal-body.component.html',
  styleUrls: ['./issue-modal-body.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IssueModalBodyComponent {
  users: any[] = []; // Array to store users
  selectedOption: any; // Variable to store the selected option
  placeholder: string = "Search User"; // Initial placeholder value
  selectedUser: number | undefined;
  //issueDateInput: string | undefined; // Variable to store the current date for issue date input
  //returnDateInput: string | undefined; // Variable to store the current date for return date input
  returnDateInputValue: string;
  issueDateInputValue: string;
    router: any;
  constructor() {
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
  }

  // Function to format the date as YYYY-MM-DD (required format for input type="date")
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  

}
