import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeMobileComponent } from './revoke-mobile.component';

describe('RevokeMobileComponent', () => {
  let component: RevokeMobileComponent;
  let fixture: ComponentFixture<RevokeMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevokeMobileComponent]
    });
    fixture = TestBed.createComponent(RevokeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
