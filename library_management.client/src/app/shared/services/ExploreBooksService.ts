import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class ExploreBooksService {

  private apiUrl = this.config.apiUrl;
  constructor(private http: HttpClient, private config: ConfigServiceService) { }


  private exploreBooksSource = new BehaviorSubject<any[]>([]);
  exploreBooks$ = this.exploreBooksSource.asObservable();

  setExploreBooks(books: any[]) {
    this.exploreBooksSource.next(books);
  }
}
