import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionPanelComponent } from './permission-panel.component';

describe('PermissionPanelComponent', () => {
  let component: PermissionPanelComponent;
  let fixture: ComponentFixture<PermissionPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionPanelComponent]
    });
    fixture = TestBed.createComponent(PermissionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
