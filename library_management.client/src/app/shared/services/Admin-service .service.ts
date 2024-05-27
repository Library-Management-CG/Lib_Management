import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private apiUrl = this.config.apiUrl;
  users: any;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }

  getTotalBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Book/totalbooks');
  }

  getissueBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Book/issuebooks');
  }
  topChoicesBook(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Book/topChoicesBook');
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'BookIssue/getUsers');
  }
  getBookDetails(qrNumber: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'BookIssue/getBookDetails', qrNumber);
  }


}
