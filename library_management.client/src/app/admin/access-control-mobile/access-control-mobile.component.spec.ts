import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlMobileComponent } from './access-control-mobile.component';

describe('AccessControlMobileComponent', () => {
  let component: AccessControlMobileComponent;
  let fixture: ComponentFixture<AccessControlMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessControlMobileComponent]
    });
    fixture = TestBed.createComponent(AccessControlMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
