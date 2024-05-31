import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBooksTableComponent } from './my-books-table.component';

describe('MyBooksTableComponent', () => {
  let component: MyBooksTableComponent;
  let fixture: ComponentFixture<MyBooksTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBooksTableComponent]
    });
    fixture = TestBed.createComponent(MyBooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
