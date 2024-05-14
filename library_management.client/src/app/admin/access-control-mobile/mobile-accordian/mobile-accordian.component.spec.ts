import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccordianComponent } from './mobile-accordian.component';

describe('MobileAccordianComponent', () => {
  let component: MobileAccordianComponent;
  let fixture: ComponentFixture<MobileAccordianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileAccordianComponent]
    });
    fixture = TestBed.createComponent(MobileAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
