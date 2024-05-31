import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServiceService } from './config-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {

  private apiUrl = this.config.apiUrl;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }

  getAllBooks(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'Book/get-books', {});
  }

  archiveBook(inputData : any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'BookQrMapping/archive', inputData);
  }

}
