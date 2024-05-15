import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBookModalComponent } from './issue-book-modal.component';

describe('IssueBookModalComponent', () => {
  let component: IssueBookModalComponent;
  let fixture: ComponentFixture<IssueBookModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueBookModalComponent]
    });
    fixture = TestBed.createComponent(IssueBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
