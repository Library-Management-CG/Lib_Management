import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigServiceService } from './config-service.service';

interface Book {
  bookName: string;
  authorName: string;
  img: string;
  description: string;
  ISBN: string;
}


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







  private bookSource = new BehaviorSubject<Book>({
    bookName: '',
    authorName: '',
    img: '',
    description: '',
    ISBN: '',
  });

  book$ = this.bookSource.asObservable();

  setBook(book: Book) {
    this.bookSource.next(book);
  }

  resetBook() {
    this.bookSource.next({
      bookName: '',
      authorName: '',
      img: '',
      description: '',
      ISBN: ''
    });
  }

  setBookName(bookName: string) {
    const currentBook = this.bookSource.value;
    this.bookSource.next({ ...currentBook, bookName });
  }

  setAuthorName(authorName: string) {
    const currentBook = this.bookSource.value;
    this.bookSource.next({ ...currentBook, authorName });
  }

  setImg(img: string) {
    const currentBook = this.bookSource.value;
    this.bookSource.next({ ...currentBook, img });
  }

  setDescription(description: string) {
    const currentBook = this.bookSource.value;
    this.bookSource.next({ ...currentBook, description });
  }
}
