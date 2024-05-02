import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit() {
    this.addUserToLocalStorage();
  }

  title = 'library_management.client';

  private addUserToLocalStorage() {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'User'
    };

    localStorage.setItem('user', JSON.stringify(user));
  }

}
