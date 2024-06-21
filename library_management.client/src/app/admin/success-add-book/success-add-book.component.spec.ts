import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessAddBookComponent } from './success-add-book.component';

describe('SuccessAddBookComponent', () => {
  let component: SuccessAddBookComponent;
  let fixture: ComponentFixture<SuccessAddBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessAddBookComponent]
    });
    fixture = TestBed.createComponent(SuccessAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
