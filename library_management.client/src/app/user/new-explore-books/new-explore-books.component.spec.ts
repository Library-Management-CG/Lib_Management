import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExploreBooksComponent } from './new-explore-books.component';

describe('NewExploreBooksComponent', () => {
  let component: NewExploreBooksComponent;
  let fixture: ComponentFixture<NewExploreBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewExploreBooksComponent]
    });
    fixture = TestBed.createComponent(NewExploreBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
