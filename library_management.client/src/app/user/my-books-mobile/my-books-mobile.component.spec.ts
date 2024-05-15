import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBooksMobileComponent } from './my-books-mobile.component';

describe('MyBooksMobileComponent', () => {
  let component: MyBooksMobileComponent;
  let fixture: ComponentFixture<MyBooksMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBooksMobileComponent]
    });
    fixture = TestBed.createComponent(MyBooksMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
