import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  apiUrl = 'http://localhost:5182/api/';
  constructor() { }
}
