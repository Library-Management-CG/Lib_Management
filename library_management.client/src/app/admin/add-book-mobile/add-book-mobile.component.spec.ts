import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookMobileComponent } from './add-book-mobile.component';

describe('AddBookMobileComponent', () => {
  let component: AddBookMobileComponent;
  let fixture: ComponentFixture<AddBookMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookMobileComponent]
    });
    fixture = TestBed.createComponent(AddBookMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
