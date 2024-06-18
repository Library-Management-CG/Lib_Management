import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = this.config.apiUrl;
  users: any;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }

  getTopReaders(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'User/top', {});
  }

  getAllAdmins(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'User/allAdmins', {});
  }

  getAllUsers(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'User/allUsers', {});
  }

  getRecentBooks(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'User/recent', {});
  }

  getMostPopularBooks(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'User/mostPopular', {});
  }

  revokeUser(revokeParams:any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'User/add-admin', revokeParams );
  }

  addNewBook(books: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'Book/add-books', books);
  }


  getMyBooksMobile(userId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}BookIssue/my-books`, { userId: userId });
  }


  explorebooks(pageDetails:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Book/exploreBook', pageDetails);
  }


  availableExplore(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Book/availableBook');
  }
  getRatingFilteredBooks(ratingFilters: number[]): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'Book/RatingFilter', ratingFilters);
  }

  private adminListSubject = new BehaviorSubject<any>(null);
  adminListChanged$ = this.adminListSubject.asObservable();

  notifyAdminListChanged() {
    this.adminListSubject.next(null);
  }

}
