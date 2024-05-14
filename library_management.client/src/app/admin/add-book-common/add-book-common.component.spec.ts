import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookCommonComponent } from './add-book-common.component';

describe('AddBookCommonComponent', () => {
  let component: AddBookCommonComponent;
  let fixture: ComponentFixture<AddBookCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookCommonComponent]
    });
    fixture = TestBed.createComponent(AddBookCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
