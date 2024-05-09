import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermissionModalComponent } from './assign-permission-modal.component';

describe('AssignPermissionModalComponent', () => {
  let component: AssignPermissionModalComponent;
  let fixture: ComponentFixture<AssignPermissionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignPermissionModalComponent]
    });
    fixture = TestBed.createComponent(AssignPermissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
