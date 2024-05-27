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

  private filterValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public filterValue$: Observable<string> = this.filterValueSubject.asObservable();


  setFilterValue(filterValue: string): void {
    this.filterValueSubject.next(filterValue);
  }

  getFilterValue(): Observable<string> {
    return this.filterValue$;
  }

}
