import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBooksCardMobileComponent } from './my-books-card-mobile.component';

describe('MyBooksCardMobileComponent', () => {
  let component: MyBooksCardMobileComponent;
  let fixture: ComponentFixture<MyBooksCardMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBooksCardMobileComponent]
    });
    fixture = TestBed.createComponent(MyBooksCardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
