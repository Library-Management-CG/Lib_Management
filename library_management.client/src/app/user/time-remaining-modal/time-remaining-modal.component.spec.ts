import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRemainingModalComponent } from './time-remaining-modal.component';

describe('TimeRemainingModalComponent', () => {
  let component: TimeRemainingModalComponent;
  let fixture: ComponentFixture<TimeRemainingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeRemainingModalComponent]
    });
    fixture = TestBed.createComponent(TimeRemainingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
