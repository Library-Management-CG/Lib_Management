import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingInnerContentComponent } from './rating-inner-content.component';

describe('RatingInnerContentComponent', () => {
  let component: RatingInnerContentComponent;
  let fixture: ComponentFixture<RatingInnerContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingInnerContentComponent]
    });
    fixture = TestBed.createComponent(RatingInnerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
