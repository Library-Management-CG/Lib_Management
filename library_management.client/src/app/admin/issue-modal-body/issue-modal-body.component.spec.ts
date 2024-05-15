import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueModalBodyComponent } from './issue-modal-body.component';

describe('IssueModalBodyComponent', () => {
  let component: IssueModalBodyComponent;
  let fixture: ComponentFixture<IssueModalBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueModalBodyComponent]
    });
    fixture = TestBed.createComponent(IssueModalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
