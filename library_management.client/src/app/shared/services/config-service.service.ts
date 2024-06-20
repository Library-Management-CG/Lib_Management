import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  apiUrl = 'http://localhost:15608/api/';
  constructor() { }
}
