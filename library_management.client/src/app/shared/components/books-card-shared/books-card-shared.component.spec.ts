import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCardSharedComponent } from './books-card-shared.component';

describe('BooksCardSharedComponent', () => {
  let component: BooksCardSharedComponent;
  let fixture: ComponentFixture<BooksCardSharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksCardSharedComponent]
    });
    fixture = TestBed.createComponent(BooksCardSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
