import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureMobileComponentComponent } from './capture-mobile-component.component';

describe('CaptureMobileComponentComponent', () => {
  let component: CaptureMobileComponentComponent;
  let fixture: ComponentFixture<CaptureMobileComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaptureMobileComponentComponent]
    });
    fixture = TestBed.createComponent(CaptureMobileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
