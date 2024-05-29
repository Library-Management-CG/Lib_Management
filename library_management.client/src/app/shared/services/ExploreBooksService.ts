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

  private addBookPageSource = new BehaviorSubject<number>(0);
  addBookPage$ = this.addBookPageSource.asObservable();

  setaddBookPage(value: number) {
    this.addBookPageSource.next(value);
  }

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

  setQrCodeAtIndex(index: number, qrCode: any) {
    const currentQrCodes = this.qrCodesSource.getValue();
    if (index >= 0 && index < currentQrCodes.length) {
      currentQrCodes[index] = qrCode;
      this.qrCodesSource.next([...currentQrCodes]);
    } else {
      console.error('Index out of bounds');
    }
  }

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
