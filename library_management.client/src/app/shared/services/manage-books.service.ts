import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServiceService } from './config-service.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {

  private apiUrl = this.config.apiUrl;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }

  private bookDataSubject = new BehaviorSubject<any>(null);
  bookDataChanged$ = this.bookDataSubject.asObservable();

  notifyBookDataChanged() {
    this.bookDataSubject.next(null);
  }

  getAllBooks(inputData : any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'Book/get-books', inputData);
  }

  archiveBook(inputData : any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'BookQrMapping/archive', inputData);
  }

  getAllComments(inputData: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'Comment/getAllComments', inputData);
  }

  revokeBook(inputData: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'BookQrMapping/revoke', inputData);
  }

}
