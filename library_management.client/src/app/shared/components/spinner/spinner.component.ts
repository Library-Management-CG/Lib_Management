import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  @Input() color: string = '#FFB81C'; // Default color
  @Input() width: number = 200; // Default width

  len: number = 242.776657104492;
  time: number = 1.6;


}
