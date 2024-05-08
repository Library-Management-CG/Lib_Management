import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooksModalComponent } from './add-books-modal.component';

describe('AddBooksModalComponent', () => {
  let component: AddBooksModalComponent;
  let fixture: ComponentFixture<AddBooksModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBooksModalComponent]
    });
    fixture = TestBed.createComponent(AddBooksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
