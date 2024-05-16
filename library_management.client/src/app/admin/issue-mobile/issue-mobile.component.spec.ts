import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueMobileComponent } from './issue-mobile.component';

describe('IssueMobileComponent', () => {
  let component: IssueMobileComponent;
  let fixture: ComponentFixture<IssueMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueMobileComponent]
    });
    fixture = TestBed.createComponent(IssueMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
