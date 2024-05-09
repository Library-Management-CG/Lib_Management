import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterTableComponent } from './outer-table.component';

describe('OuterTableComponent', () => {
  let component: OuterTableComponent;
  let fixture: ComponentFixture<OuterTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OuterTableComponent]
    });
    fixture = TestBed.createComponent(OuterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
