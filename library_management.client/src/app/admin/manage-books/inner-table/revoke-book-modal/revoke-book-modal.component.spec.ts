import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeBookModalComponent } from './revoke-book-modal.component';

describe('RevokeBookModalComponent', () => {
  let component: RevokeBookModalComponent;
  let fixture: ComponentFixture<RevokeBookModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevokeBookModalComponent]
    });
    fixture = TestBed.createComponent(RevokeBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
