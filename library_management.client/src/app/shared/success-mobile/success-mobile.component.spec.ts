import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMobileComponent } from './success-mobile.component';

describe('SuccessMobileComponent', () => {
  let component: SuccessMobileComponent;
  let fixture: ComponentFixture<SuccessMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessMobileComponent]
    });
    fixture = TestBed.createComponent(SuccessMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
