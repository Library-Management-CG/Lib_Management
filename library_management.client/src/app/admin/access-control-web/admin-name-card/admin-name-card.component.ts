import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-name-card',
  templateUrl: './admin-name-card.component.html',
  styleUrls: ['./admin-name-card.component.css']
})
export class AdminNameCardComponent {
  @Input() admin: any;
  @Output() adminSelected: EventEmitter<any> = new EventEmitter<any>();

  selectAdmin() {
    this.adminSelected.emit(this.admin); // Emit the selected admin
  }
}
