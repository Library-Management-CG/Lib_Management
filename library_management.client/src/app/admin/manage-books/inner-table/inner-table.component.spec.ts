import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerTableComponent } from './inner-table.component';

describe('InnerTableComponent', () => {
  let component: InnerTableComponent;
  let fixture: ComponentFixture<InnerTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerTableComponent]
    });
    fixture = TestBed.createComponent(InnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
