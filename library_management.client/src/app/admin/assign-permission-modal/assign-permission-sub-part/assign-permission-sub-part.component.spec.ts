import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPermissionSubPartComponent } from './assign-permission-sub-part.component';

describe('AssignPermissionSubPartComponent', () => {
  let component: AssignPermissionSubPartComponent;
  let fixture: ComponentFixture<AssignPermissionSubPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignPermissionSubPartComponent]
    });
    fixture = TestBed.createComponent(AssignPermissionSubPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
