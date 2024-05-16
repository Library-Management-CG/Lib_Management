import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreBooksComponent } from './explore-books.component';

describe('ExploreBooksComponent', () => {
  let component: ExploreBooksComponent;
  let fixture: ComponentFixture<ExploreBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreBooksComponent]
    });
    fixture = TestBed.createComponent(ExploreBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
