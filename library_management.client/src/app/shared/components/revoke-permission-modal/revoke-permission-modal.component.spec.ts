import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokePermissionModalComponent } from './revoke-permission-modal.component';

describe('RevokePermissionModalComponent', () => {
  let component: RevokePermissionModalComponent;
  let fixture: ComponentFixture<RevokePermissionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevokePermissionModalComponent]
    });
    fixture = TestBed.createComponent(RevokePermissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
