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


  private mappedBookSource = new BehaviorSubject<any>(null);
  mappedBook$ = this.mappedBookSource.asObservable();

  setExploreBooks(books: any[]) {
    this.exploreBooksSource.next(books);
  }


  setMappedBook(mappedBook: any) {
    this.mappedBookSource.next(mappedBook);
  }


  private qrCodesSource = new BehaviorSubject<any[]>([]);
  qrCodes$ = this.qrCodesSource.asObservable();



  setQrCodes(qrCodes: any[]) {
    this.qrCodesSource.next(qrCodes);
  }

  addQrCode(qrCode: any) {
    const currentQrCodes = this.qrCodesSource.getValue();
    this.qrCodesSource.next([...currentQrCodes, qrCode]);
  }

  removeQrCode(index: number) {
    const currentQrCodes = this.qrCodesSource.getValue();
    currentQrCodes.splice(index, 1);
    this.qrCodesSource.next([...currentQrCodes]);
  }
}
